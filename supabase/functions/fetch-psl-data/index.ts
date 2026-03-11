import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('Starting PSL data fetch...')

    // Fetch from PSL website
    const pslHtml = await fetchPage('https://www.psl.co.za/')
    // Fetch from FlashScore for Betway Premiership
    const flashHtml = await fetchPage('https://www.flashscore.co.za/football/south-africa/premier-soccer-league/')

    // Parse standings from FlashScore (more structured)
    const standings = parseFlashScoreStandings(flashHtml)
    const fixtures = parseFlashScoreFixtures(flashHtml)

    // Also try PSL website
    const pslFixtures = parsePSLFixtures(pslHtml)
    const pslStandings = parsePSLStandings(pslHtml)

    // Merge: prefer FlashScore data, fallback to PSL
    const finalStandings = standings.length > 0 ? standings : pslStandings
    const finalFixtures = fixtures.length > 0 ? fixtures : pslFixtures

    // Upsert standings into DB
    if (finalStandings.length > 0) {
      const { error: standingsError } = await supabase
        .from('standings')
        .upsert(
          finalStandings.map((s, i) => ({
            team_name: s.team_name,
            position: s.position || i + 1,
            played: s.played,
            wins: s.wins,
            draws: s.draws,
            losses: s.losses,
            goals_for: s.goals_for,
            goals_against: s.goals_against,
            goal_difference: s.goal_difference,
            points: s.points,
            form: s.form || [],
            season: '2025/26',
            updated_at: new Date().toISOString(),
          })),
          { onConflict: 'team_name,season' }
        )
      if (standingsError) console.error('Standings upsert error:', standingsError)
      else console.log(`Upserted ${finalStandings.length} standings`)
    }

    // Upsert fixtures into DB
    if (finalFixtures.length > 0) {
      const { error: fixturesError } = await supabase
        .from('fixtures')
        .upsert(
          finalFixtures.map(f => ({
            home_team: f.home_team,
            away_team: f.away_team,
            home_score: f.home_score,
            away_score: f.away_score,
            match_date: f.match_date,
            match_time: f.match_time,
            venue: f.venue || null,
            status: f.status,
            season: '2025/26',
            updated_at: new Date().toISOString(),
          })),
          { onConflict: 'home_team,away_team,match_date' }
        )
      if (fixturesError) console.error('Fixtures upsert error:', fixturesError)
      else console.log(`Upserted ${finalFixtures.length} fixtures`)
    }

    return new Response(
      JSON.stringify({
        success: true,
        standings: finalStandings.length,
        fixtures: finalFixtures.length,
        lastUpdated: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching PSL data:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch PSL data', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function fetchPage(url: string): string {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })
    if (!response.ok) {
      console.warn(`Failed to fetch ${url}: ${response.status}`)
      return ''
    }
    return await response.text()
  } catch (e) {
    console.warn(`Error fetching ${url}:`, e)
    return ''
  }
}

// ========== FlashScore Parsing ==========

function parseFlashScoreStandings(html: string) {
  if (!html) return []
  const standings: any[] = []
  
  try {
    // FlashScore table rows pattern
    // Look for table rows with team data
    const tableRegex = /class="[^"]*tableCellParticipantName[^"]*"[^>]*>([^<]+)/gi
    const rowRegex = /<div[^>]*class="[^"]*table__row[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi
    
    // Simple regex approach for standings table
    const lines = html.split('\n')
    let inTable = false
    let position = 0
    
    for (const line of lines) {
      // Look for team names in standings context
      const teamMatch = line.match(/participant__participantName[^>]*>([^<]+)/i)
      if (teamMatch) {
        position++
        const numbersInLine = html.substring(
          html.indexOf(teamMatch[0]) - 500,
          html.indexOf(teamMatch[0]) + 200
        )
        
        standings.push({
          team_name: teamMatch[1].trim(),
          position,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goals_for: 0,
          goals_against: 0,
          goal_difference: 0,
          points: 0,
          form: [],
        })
      }
    }
  } catch (e) {
    console.warn('FlashScore standings parse error:', e)
  }
  
  return standings
}

function parseFlashScoreFixtures(html: string) {
  if (!html) return []
  const fixtures: any[] = []
  
  try {
    // Look for match entries with home/away teams and scores
    const matchRegex = /event__participant--home[^>]*>([^<]+)[\s\S]*?event__participant--away[^>]*>([^<]+)[\s\S]*?event__score--home[^>]*>(\d+)[\s\S]*?event__score--away[^>]*>(\d+)/gi
    let match
    
    while ((match = matchRegex.exec(html)) !== null) {
      fixtures.push({
        home_team: match[1].trim(),
        away_team: match[2].trim(),
        home_score: parseInt(match[3]),
        away_score: parseInt(match[4]),
        match_date: new Date().toISOString().split('T')[0],
        match_time: null,
        venue: null,
        status: 'completed',
      })
    }
  } catch (e) {
    console.warn('FlashScore fixtures parse error:', e)
  }
  
  return fixtures
}

// ========== PSL Website Parsing ==========

function parsePSLStandings(html: string) {
  if (!html) return []
  const standings: any[] = []
  
  try {
    // Look for league table data in PSL website
    const tableRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let match
    let position = 0
    
    while ((match = tableRegex.exec(html)) !== null) {
      const row = match[1]
      const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi)
      
      if (cells && cells.length >= 7) {
        const getText = (cell: string) => cell.replace(/<[^>]+>/g, '').trim()
        const teamName = getText(cells[1] || '')
        
        if (teamName && teamName.length > 2 && !/^\d+$/.test(teamName)) {
          position++
          const p = parseInt(getText(cells[2] || '0')) || 0
          const w = parseInt(getText(cells[3] || '0')) || 0
          const d = parseInt(getText(cells[4] || '0')) || 0
          const l = parseInt(getText(cells[5] || '0')) || 0
          const gf = parseInt(getText(cells[6] || '0')) || 0
          const ga = parseInt(getText(cells[7] || '0')) || 0
          const pts = parseInt(getText(cells[cells.length - 1] || '0')) || 0
          
          standings.push({
            team_name: teamName,
            position,
            played: p,
            wins: w,
            draws: d,
            losses: l,
            goals_for: gf,
            goals_against: ga,
            goal_difference: gf - ga,
            points: pts,
            form: [],
          })
        }
      }
    }
  } catch (e) {
    console.warn('PSL standings parse error:', e)
  }
  
  return standings
}

function parsePSLFixtures(html: string) {
  if (!html) return []
  const fixtures: any[] = []
  
  try {
    // Look for fixture blocks in PSL website
    const fixtureRegex = /fixture[^>]*>([\s\S]*?)<\/div>/gi
    let match
    
    while ((match = fixtureRegex.exec(html)) !== null) {
      const block = match[1]
      const teams = block.match(/>([A-Z][a-zA-Z\s]+(?:FC|United|City|Pirates|Chiefs|Sundowns|Arrows|Galaxy|Stellies))/gi)
      const scores = block.match(/(\d+)\s*-\s*(\d+)/)
      const dateMatch = block.match(/(\d{4}-\d{2}-\d{2}|\d{2}\s\w+\s\d{4})/)
      
      if (teams && teams.length >= 2) {
        const homeTeam = teams[0].replace(/^>/, '').trim()
        const awayTeam = teams[1].replace(/^>/, '').trim()
        
        fixtures.push({
          home_team: homeTeam,
          away_team: awayTeam,
          home_score: scores ? parseInt(scores[1]) : null,
          away_score: scores ? parseInt(scores[2]) : null,
          match_date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
          match_time: null,
          venue: null,
          status: scores ? 'completed' : 'upcoming',
        })
      }
    }
  } catch (e) {
    console.warn('PSL fixtures parse error:', e)
  }
  
  return fixtures
}

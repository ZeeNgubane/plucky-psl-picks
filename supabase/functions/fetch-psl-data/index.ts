import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const SPORTSDB_BASE = 'https://www.thesportsdb.com/api/v1/json/3'
const LEAGUE_ID = '4802' // South African Premier Soccer League
const SEASON = '2025-2026'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('Fetching PSL data from TheSportsDB...')

    // Fetch standings and recent events in parallel
    const [standingsRes, eventsRes, nextEventsRes] = await Promise.all([
      fetch(`${SPORTSDB_BASE}/lookuptable.php?l=${LEAGUE_ID}&s=${SEASON}`),
      fetch(`${SPORTSDB_BASE}/eventspastleague.php?id=${LEAGUE_ID}`),
      fetch(`${SPORTSDB_BASE}/eventsnextleague.php?id=${LEAGUE_ID}`),
    ])

    const standingsData = await standingsRes.json()
    const eventsData = await eventsRes.json()
    const nextEventsData = await nextEventsRes.json()

    let standingsCount = 0
    let fixturesCount = 0

    // Process standings
    if (standingsData?.table && Array.isArray(standingsData.table)) {
      const standings = standingsData.table.map((team: any, i: number) => ({
        team_name: team.strTeam || team.name,
        position: parseInt(team.intRank) || i + 1,
        played: parseInt(team.intPlayed) || 0,
        wins: parseInt(team.intWin) || 0,
        draws: parseInt(team.intDraw) || 0,
        losses: parseInt(team.intLoss) || 0,
        goals_for: parseInt(team.intGoalsFor) || 0,
        goals_against: parseInt(team.intGoalsAgainst) || 0,
        goal_difference: parseInt(team.intGoalDifference) || 0,
        points: parseInt(team.intPoints) || 0,
        form: team.strForm ? team.strForm.split('') : [],
        season: '2025/26',
        updated_at: new Date().toISOString(),
      }))

      const { error } = await supabase
        .from('standings')
        .upsert(standings, { onConflict: 'team_name,season' })

      if (error) console.error('Standings upsert error:', error)
      else standingsCount = standings.length
      console.log(`Processed ${standings.length} standings`)
    } else {
      console.warn('No standings data returned:', JSON.stringify(standingsData).substring(0, 200))
    }

    // Process past results
    const allFixtures: any[] = []

    if (eventsData?.events && Array.isArray(eventsData.events)) {
      for (const event of eventsData.events) {
        allFixtures.push({
          home_team: event.strHomeTeam,
          away_team: event.strAwayTeam,
          home_score: event.intHomeScore !== null ? parseInt(event.intHomeScore) : null,
          away_score: event.intAwayScore !== null ? parseInt(event.intAwayScore) : null,
          match_date: event.dateEvent,
          match_time: event.strTime?.substring(0, 5) || null,
          venue: event.strVenue || null,
          status: event.strStatus === 'Match Finished' ? 'completed' : (event.strStatus || 'completed'),
          matchday: event.intRound ? parseInt(event.intRound) : null,
          season: '2025/26',
          updated_at: new Date().toISOString(),
        })
      }
      console.log(`Processed ${eventsData.events.length} past events`)
    }

    // Process upcoming fixtures
    if (nextEventsData?.events && Array.isArray(nextEventsData.events)) {
      for (const event of nextEventsData.events) {
        allFixtures.push({
          home_team: event.strHomeTeam,
          away_team: event.strAwayTeam,
          home_score: null,
          away_score: null,
          match_date: event.dateEvent,
          match_time: event.strTime?.substring(0, 5) || null,
          venue: event.strVenue || null,
          status: 'upcoming',
          matchday: event.intRound ? parseInt(event.intRound) : null,
          season: '2025/26',
          updated_at: new Date().toISOString(),
        })
      }
      console.log(`Processed ${nextEventsData.events.length} upcoming events`)
    }

    if (allFixtures.length > 0) {
      const { error } = await supabase
        .from('fixtures')
        .upsert(allFixtures, { onConflict: 'home_team,away_team,match_date' })

      if (error) console.error('Fixtures upsert error:', error)
      else fixturesCount = allFixtures.length
    }

    const result = {
      success: true,
      standings: standingsCount,
      fixtures: fixturesCount,
      lastUpdated: new Date().toISOString()
    }

    console.log('Result:', JSON.stringify(result))

    return new Response(
      JSON.stringify(result),
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

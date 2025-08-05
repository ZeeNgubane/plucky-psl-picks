import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // PSL website scraping
    const pslData = await scrapePSLData()
    
    return new Response(
      JSON.stringify({
        ...pslData,
        lastUpdated: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error fetching PSL data:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch PSL data' }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

async function scrapePSLData() {
  try {
    // Fetch PSL website data
    const response = await fetch('https://www.psl.co.za/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const html = await response.text()
    
    // Parse fixtures, standings, and news from the HTML
    const fixtures = parseFixtures(html)
    const standings = parseStandings(html)
    const news = parseNews(html)
    
    return {
      fixtures,
      standings,
      news
    }
  } catch (error) {
    console.error('Error scraping PSL data:', error)
    // Return mock data for development
    return getMockPSLData()
  }
}

function parseFixtures(html: string) {
  // This would parse actual fixtures from the HTML
  // For now, returning mock data
  return [
    {
      homeTeam: "Orlando Pirates",
      awayTeam: "Kaizer Chiefs",
      date: "2024-01-20T15:00:00Z",
      venue: "FNB Stadium"
    },
    {
      homeTeam: "Mamelodi Sundowns",
      awayTeam: "SuperSport United",
      date: "2024-01-21T15:30:00Z",
      venue: "Loftus Versfeld"
    }
  ]
}

function parseStandings(html: string) {
  // This would parse actual standings from the HTML
  // For now, returning mock data
  return [
    {
      name: "Mamelodi Sundowns",
      played: 15,
      wins: 12,
      draws: 2,
      losses: 1,
      points: 38
    },
    {
      name: "Orlando Pirates",
      played: 15,
      wins: 9,
      draws: 4,
      losses: 2,
      points: 31
    },
    {
      name: "Kaizer Chiefs",
      played: 15,
      wins: 8,
      draws: 5,
      losses: 2,
      points: 29
    }
  ]
}

function parseNews(html: string) {
  // This would parse actual news from the HTML
  // For now, returning mock data
  return [
    {
      title: "PSL Season 2024 Kicks Off",
      summary: "The new PSL season promises exciting matches and fierce competition.",
      date: "2024-01-15T10:00:00Z"
    },
    {
      title: "Transfer Window Updates",
      summary: "Latest player transfers and signings across PSL clubs.",
      date: "2024-01-14T14:30:00Z"
    }
  ]
}

function getMockPSLData() {
  return {
    fixtures: [
      {
        homeTeam: "Orlando Pirates",
        awayTeam: "Kaizer Chiefs",
        date: "2024-01-20T15:00:00Z",
        venue: "FNB Stadium"
      },
      {
        homeTeam: "Mamelodi Sundowns",
        awayTeam: "SuperSport United",
        date: "2024-01-21T15:30:00Z",
        venue: "Loftus Versfeld"
      },
      {
        homeTeam: "AmaZulu FC",
        awayTeam: "Cape Town City",
        date: "2024-01-22T19:30:00Z",
        venue: "Moses Mabhida Stadium"
      }
    ],
    standings: [
      {
        name: "Mamelodi Sundowns",
        played: 15,
        wins: 12,
        draws: 2,
        losses: 1,
        points: 38
      },
      {
        name: "Orlando Pirates",
        played: 15,
        wins: 9,
        draws: 4,
        losses: 2,
        points: 31
      },
      {
        name: "Kaizer Chiefs",
        played: 15,
        wins: 8,
        draws: 5,
        losses: 2,
        points: 29
      },
      {
        name: "SuperSport United",
        played: 15,
        wins: 7,
        draws: 6,
        losses: 2,
        points: 27
      },
      {
        name: "Cape Town City",
        played: 15,
        wins: 7,
        draws: 4,
        losses: 4,
        points: 25
      }
    ],
    news: [
      {
        title: "PSL Season 2024 Kicks Off With Record Attendance",
        summary: "The new PSL season promises exciting matches and fierce competition as fans return to stadiums.",
        date: "2024-01-15T10:00:00Z"
      },
      {
        title: "Transfer Window Updates: Major Signings Across PSL",
        summary: "Latest player transfers and signings across PSL clubs shake up team dynamics.",
        date: "2024-01-14T14:30:00Z"
      },
      {
        title: "Mamelodi Sundowns Extend Lead at Top",
        summary: "The defending champions continue their impressive form with another victory.",
        date: "2024-01-13T16:45:00Z"
      }
    ]
  }
}
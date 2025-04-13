import { NextResponse } from "next/server"; // Import NextResponse for App Router responses
// Import cheerio dynamically as it's an ESM module
// Note: Top-level await is generally available in modern Node.js versions used by Next.js API routes
const cheerio = await import("cheerio");

// Use export async function GET(request) for App Router
export async function GET(request) {
  const leagueUrl =
    "https://fulltime.thefa.com/table.html?league=14994586&selectedSeason=863010173&selectedDivision=665989348&selectedCompetition=0&selectedFixtureGroupKey=1_988525989";

  try {
    // 1. Fetch the HTML content
    const response = await fetch(leagueUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        // Add cache-control header to try and bypass potential fetch caches
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      // Tell fetch itself not to use cache if running in Node environments that support it
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch page: ${response.status} ${response.statusText}`
      );
      const errorBody = await response.text();
      console.error("Error response body:", errorBody.substring(0, 500));
      throw new Error(
        `Failed to fetch page: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();

    // 2. Load the HTML into cheerio
    const $ = cheerio.load(html);

    // 3. Parse the data
    const tableData = [];
    const tableElement = $("table.cell-dividers");

    if (tableElement.length === 0) {
      console.warn(
        "Could not find the league table element using selector 'table.cell-dividers'."
      );
    }

    tableElement.find("tbody tr").each((index, element) => {
      const columns = $(element).find("td");
      // POS(0), Team(1), P(2), W(3), D(4), L(5), GD(6), PTS(7)
      if (columns.length >= 8) {
        const position = $(columns[0]).text().trim();
        const team = $(columns[1]).find("a").text().trim();
        const played = $(columns[2]).text().trim();
        const won = $(columns[3]).text().trim();
        const drawn = $(columns[4]).text().trim();
        const lost = $(columns[5]).text().trim();
        const goalDifference = $(columns[6]).text().trim();
        const points = $(columns[7]).text().trim();

        if (position && team && points) {
          tableData.push({
            position,
            team,
            played,
            won,
            drawn,
            lost,
            goalDifference,
            points,
          });
        } else {
          console.warn(`Row ${index + 1} parsed with missing essential data.`);
        }
      } else if (columns.length > 0) {
        console.warn(
          `Skipping row ${index + 1} - Expected 8+ columns, found ${
            columns.length
          }.`
        );
      }
    });

    if (tableData.length === 0) {
      console.warn("Table data array is empty after parsing.");
      // Consider returning an empty array instead of an error if the table is genuinely empty
    }

    // 4. Return the parsed data using NextResponse for App Router
    // Set caching headers here as well
    return NextResponse.json(
      { table: tableData },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/league-table route handler:", error);
    // Return error response using NextResponse
    // Provide a status code appropriate for server errors
    return NextResponse.json(
      { error: "Failed to process league table data." },
      { status: 500 }
    );
  }
}

// Optional: Define revalidation time for Next.js ISR (Incremental Static Regeneration)
// export const revalidate = 600; // Revalidate data every 10 minutes

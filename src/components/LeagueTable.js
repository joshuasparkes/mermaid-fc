"use client"; // This component uses client-side hooks (useState, useEffect)
import { useEffect, useState } from "react";

export default function LeagueTable() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/league-table") // Calls the API route
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errData) => {
            throw new Error(
              errData.error || `HTTP error! status: ${res.status}`
            );
          });
        }
        return res.json(); // Parse successful response as JSON
      })
      .then((data) => {
        if (data && data.table) {
          setTable(data.table); // Update state with fetched table data
          setError(null); // Clear any previous errors
        } else {
          throw new Error("Invalid data format received from API");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch league table:", err);
        setError(err.message); // Set error message state
        setTable([]); // Clear table data on error
      })
      .finally(() => {
        setLoading(false); // Set loading state to false regardless of outcome
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="border rounded shadow-md overflow-hidden">
      {" "}
      {/* Add some container styling */}
      <h2 className="text-lg text-black font-semibold mb-3 p-3 bg-gray-100 border-b">
        Hertfordshire 1961 Sunday Football League
      </h2>{" "}
      {/* Component Title */}
      <div className="p-3">
        {" "}
        {/* Padding for content area */}
        {loading && <p>Loading table...</p>}
        {error && <p className="text-red-500">Error loading table: {error}</p>}
      </div>
      {!loading && !error && table.length > 0 && (
        // Render the table only if not loading, no error, and data exists
        // overflow-x-auto allows horizontal scrolling on small screens if table is wide
        <div className="overflow-x-auto p-3">
          <table className="table-auto text-black border-collapse w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Pos</th>
                <th className="border p-2 text-left">Team</th>
                <th className="border p-2 text-center">P</th>
                <th className="border p-2 text-center">W</th>
                <th className="border p-2 text-center">D</th>
                <th className="border p-2 text-center">L</th>
                {/* Removed GF/GA as they weren't in the last API response */}
                <th className="border p-2 text-center">GD</th>
                <th className="border p-2 text-center font-bold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => {
                // {{ Determine base row style }}
                const baseRowClass = i % 2 === 0 ? "bg-white" : "bg-gray-50";
                // {{ Check if the current row's team is 'Mermaid FC First' }}
                const isMermaidRow = row.team === "Mermaid FC First";
                // {{ Apply highlight class if it's the target row, otherwise keep base style }}
                // {{ You can change 'bg-blue-100 font-semibold' to any other Tailwind classes for highlighting }}
                const highlightClass = isMermaidRow
                  ? "bg-blue-100 font-semibold" // Highlight style
                  : "hover:bg-gray-100"; // Normal hover style

                return (
                  <tr
                    key={i}
                    // {{ Combine base class with either highlight or hover class }}
                    className={`${baseRowClass} ${highlightClass}`}
                  >
                    <td className="border p-2 text-center">{row.position}</td>
                    <td className="border p-2">{row.team}</td>
                    <td className="border p-2 text-center">{row.played}</td>
                    <td className="border p-2 text-center">{row.won}</td>
                    <td className="border p-2 text-center">{row.drawn}</td>
                    <td className="border p-2 text-center">{row.lost}</td>
                    <td className="border p-2 text-center">
                      {row.goalDifference}
                    </td>
                    <td className="border p-2 text-center font-bold">
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* Display message if loading finished, no error, but no data was found */}
      {!loading && !error && table.length === 0 && (
        <p className="p-3">No table data found.</p>
      )}
    </div>
  );
}

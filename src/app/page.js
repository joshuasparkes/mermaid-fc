import LeagueTable from "@/components/LeagueTable"; // Adjust path if your components dir isn't under src or alias isn't set
import Enquire from "@/components/Enquire"; // Adjust path if needed

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Mermaid FC Hub {/* Example Title */}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-1/3">
          <Enquire />
        </div>
        <div className="flex-1 md:w-2/3 min-w-0">
          <LeagueTable />
        </div>
      </div>
    </main>
  );
}

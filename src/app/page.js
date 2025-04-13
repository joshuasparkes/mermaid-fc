import LeagueTable from "@/components/LeagueTable";
import Enquire from "@/components/Enquire";
import Image from "next/image"; // Import Image component here for the player image

export default function Home() {
  return (
    <main>
      <section className="bg-black text-white py-16 md:py-16 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            <div className="md:w-3/5 lg:w-1/2 text-center md:text-left">
              <Enquire />
            </div>

            <div className="md:w-2/5 lg:w-1/2 flex justify-center md:justify-end">
              <Image
                src="/player.png" // Ensure player.png is in /public
                alt="Mermaid FC Player"
                width={400} // Adjust size as needed
                height={400} // Adjust size as needed
                className="rounded-lg object-contain max-w-xs md:max-w-sm lg:max-w-md" // Control max size
                priority // Load image faster
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-center text-gray-200 mb-8">
            Current Standings
          </h2>
          <div className="min-w-0">
            <LeagueTable />
          </div>
        </div>
      </section>
    </main>
  );
}

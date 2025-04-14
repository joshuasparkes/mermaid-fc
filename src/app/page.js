import LeagueTable from "@/components/LeagueTable";
import Enquire from "@/components/Enquire";
import Image from "next/image"; // Import Image component here for the player image
import NotificationBar from "@/components/NotificationBar"; // Import the new component
import Link from "next/link"; // Import Link component for navigation

export default function Home() {
  return (
    <main>
      <NotificationBar />
      <section className="bg-black text-white py-16 md:py-16 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row  md:items-start lg:items-start gap-8 md:gap-12">
            <div className="md:w-4/5 lg:w-3/4 text-center md:text-left">
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
      <section className="py-12 bg-black md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-center text-gray-200 mb-8">
            Current Standings
          </h2>
          <div className="min-w-0">
            <LeagueTable />
          </div>
        </div>
      </section>

      {/* Navigation Links Section */}
      <section className="py-12 md:py-16 bg-gray-900">
        {" "}
        {/* Added bg color for contrast */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-center text-orange-500 mb-8">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Player Package Link */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-orange-400 mb-3">
                Player Package
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Discover what&apos;s included when you join the team.
              </p>
              <Link href="/player-package">
                <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                  View Package
                </span>
              </Link>
            </div>

            {/* About Us Link */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-orange-400 mb-3">
                About Us
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Learn about our club&apos;s history, values, and goals.
              </p>
              <Link href="/about">
                <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                  Learn More
                </span>
              </Link>
            </div>

            {/* Fixtures & Results Link */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-orange-400 mb-3">
                Fixtures & Results
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Check upcoming matches and past game results.
              </p>
              <Link href="/fixtures-results">
                <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                  View Schedule
                </span>
              </Link>
            </div>

            {/* Watch Matches Link */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-orange-400 mb-3">
                Watch Matches
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                View recordings of our previous games via Veo.
              </p>
              <a
                href="https://app.veo.co/clubs/the-mermaid-fc/recordings/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer"
              >
                Watch Now
              </a>
            </div>

            {/* Contact Us Link */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-orange-400 mb-3">
                Contact Us
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Get in touch with the club officials or management.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                  Get In Touch
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image"; // Import if using Next Image for placeholders
import Link from "next/link"; // Import Link component for navigation

export default function PlayerPackagePage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold font-heading text-center text-orange-500 mb-8 md:mb-12">
        Our Player Package
      </h1>

      <div className="space-y-8">
        {/* Box 1: League Competition */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src="/1961.jpg"
              alt="Herts 1961 League Logo"
              width={200}
              height={192}
              className="w-full h-48 object-contain rounded"
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-300">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              League Competition
            </h2>
            <p>Competitive Herts 1961 League.</p>
            <p>Games played every Sunday morning (10:00 AM Kick-off).</p>
          </div>
        </div>

        {/* Box 2: Cup Competitions */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src="/cup.png"
              alt="Cup Competition Trophy"
              width={200}
              height={192}
              className="w-full h-48 object-contain rounded"
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-300">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              Cup Competitions
            </h2>
            <p>
              Participation in the Goulding Cup and League Cup competitions.
            </p>
            <p>Matches typically played on Sundays.</p>
          </div>
        </div>

        {/* Box 3: Coaching */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src="/coaching.png"
              alt="Football Coaching Session"
              width={200}
              height={192}
              className="w-full h-48 object-contain rounded"
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-300">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              Coaching
            </h2>
            <p>Training sessions run by licensed UEFA Coaches.</p>
            <p>Focus on player development and tactical understanding.</p>
          </div>
        </div>

        {/* Box 4: Nutrition & Fitness */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src="/nutrition.jpg"
              alt="Fitness and Nutrition Planning"
              width={200}
              height={192}
              className="w-full h-48 object-contain rounded"
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-300">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              Nutrition & Fitness Support
            </h2>
            <p>
              Guidance on fitness and nutrition provided by coaching staff and
              management.
            </p>
            <p>Support to help players maintain peak physical condition.</p>
          </div>
        </div>

        {/* Box 5: Social */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src="/social.png"
              alt="Team Social Event"
              width={200}
              height={192}
              className="w-full h-48 object-contain rounded"
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-300">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3">
              Social Scene
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Post-match drinks (beers/coffee) and analysis.</li>
              <li>Annual Christmas Party.</li>
              <li>End of Season Awards ceremony and celebration.</li>
              <li>Team fundraising events and competitions.</li>
              <li>Active team WhatsApp group for communication and banter.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Links Section */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <h2 className="text-3xl font-bold font-heading text-center text-orange-500 mb-8">
          Explore More
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Home Link */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-orange-400 mb-3">Home</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Return to the main page to get the latest updates.
            </p>
            <Link href="/">
              <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                Go Home
              </span>
            </Link>
          </div>

          {/* About Us Link */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-orange-400 mb-3">
              About Us
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Learn more about the history and values of our club.
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
    </main>
  );
}

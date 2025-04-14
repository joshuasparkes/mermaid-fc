import Image from "next/image"; // Import the Image component

// --- Player Data ---
// Replace this with your actual player data and image paths
const squadData = [
  {
    id: 1,
    name: "Callum Pickstock",
    position: "Centre Midfield",
    imageUrl: "/player.png",
  },
  {
    id: 2,
    name: "Sim Vilakati",
    position: "Center Midfield",
    imageUrl: "/player.png",
  },
  {
    id: 3,
    name: "Ben McAfferty",
    position: "Center Back / Captain",
    imageUrl: "/player.png",
  }, // Placeholder Image
  {
    id: 4,
    name: "Andy USA",
    position: "Right Back",
    imageUrl: "/player.png",
  },
  {
    id: 5,
    name: "Deniz Keni Five",
    position: "Left Back",
    imageUrl: "/player.png",
  },
  {
    id: 6,
    name: "Zak",
    position: "Center Back",
    imageUrl: "/player.png",
  },
  {
    id: 7,
    name: "Joshua Sparkes",
    position: "Forward / Coach",
    imageUrl: "/player.png",
  },
  {
    id: 8,
    name: "Harry",
    position: "Goalkeeper",
    imageUrl: "/player.png",
  },
  {
    id: 9,
    name: "Harry",
    position: "Defender",
    imageUrl: "/player.png",
  },
  {
    id: 10,
    name: "Sami",
    position: "Right Wing",
    imageUrl: "/player.png",
  },
  {
    id: 11,
    name: "Chris Jones",
    position: "Striker",
    imageUrl: "/player.png",
  },
  {
    id: 12,
    name: "Dylan",
    position: "Left Wing",
    imageUrl: "/player.png",
  },
  {
    id: 13,
    name: "Joey",
    position: "Midfield",
    imageUrl: "/player.png",
  },
  {
    id: 14,
    name: "Merv",
    position: "Manager",
    imageUrl: "/player.png",
  },
  {
    id: 15,
    name: "Eddie",
    position: "Assistant Manager",
    imageUrl: "/player.png",
  },
  
];

export default function SquadPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-200 mb-10 md:mb-12">
        Meet the Squad
      </h1>

      {/* Grid Container */}
      {/* Adjust grid columns for different screen sizes as desired */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Map over the squad data */}
        {squadData.map((player) => (
          // Player Card
          <div
            key={player.id} // Essential React key prop
            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 text-center transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col" // Added flex flex-col
          >
            {/* Player Image */}
            <div className="mb-4 flex-shrink-0">
              {" "}
              {/* Ensure image area doesn't shrink excessively */}
              <Image
                src={player.imageUrl}
                alt={`Photo of ${player.name}`}
                width={150} // Adjust size as needed
                height={150} // Should match width for square aspect ratio if desired
                className="rounded-full object-cover mx-auto w-[150px] h-[150px]" // Ensure fixed size and cover
                priority={player.id <= 8} // Prioritize loading images for ~first 2 rows
              />
            </div>

            {/* Player Info */}
            <div className="flex-grow flex flex-col justify-center">
              {" "}
              {/* Allow text area to grow and center content */}
              <h3 className="text-lg font-semibold font-heading text-gray-900 mb-1">
                {player.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium">
                {player.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

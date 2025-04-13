import { FaTrophy } from "react-icons/fa";

// --- Honours Data ---
const honorsData = [
  { category: "Division 1 Winners", years: ["2004/05", "2022/23"] },
  { category: "Division 2 Winners", years: ["2013/14", "2021/22"] },
  { category: "Division 3 Winners", years: ["2020/21"] },
  { category: "Reserve Cup Winners", years: ["2022/23"] },
];
// --- End Honours Data ---

export default function HistoryPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-200 mb-8 md:mb-10">
        Our History
      </h1>

      <div className="prose prose-lg max-w-3xl mx-auto mb-12 text-gray-200">
        <p>
          Mermaid FC has a long and proud history within the St. Albans Sunday
          League circuit. Established in [Year Established - e.g., 19XX], the
          club has seen generations of players don the famous colours...
        </p>
        <p>
          [Add more paragraphs about the club&apos;s formation, key milestones,
          memorable seasons, etc. here.]
        </p>
      </div>

      <section className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-200 mb-8">
          Club Honours
        </h2>

        <ul className="space-y-4 max-w-xl mx-auto">
          {honorsData.map((honor, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center space-x-4 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="flex-shrink-0 text-yellow-500">
                <FaTrophy className="w-6 h-6" />
              </div>

              <div className="flex-grow">
                <h3 className="text-md font-semibold text-gray-800">
                  {honor.category}
                </h3>
                <p className="text-sm text-gray-600">
                  {honor.years.join(", ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

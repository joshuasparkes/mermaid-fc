import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function SocialsPage() {
  const demoPostUrl = "https://www.instagram.com/p/DIWVNP-o1FM/";
  const instagramProfileUrl = "https://www.instagram.com/mermaidfc_/";

  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-200 mb-10 md:mb-12">
        Follow Us on Social Media
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold font-heading text-gray-200 mb-6 text-center">
          Featured Post
        </h2>

        <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <Link href={demoPostUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="/demo_post.png"
              alt="Screenshot of Mermaid FC Instagram post"
              width={500}
              height={600}
              className="w-full h-auto rounded"
            />
          </Link>
          <p className="text-center text-sm text-gray-500 mt-3">
            <Link
              href={demoPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View on Instagram
            </Link>
            (Demo Screenshot)
          </p>
        </div>
      </section>

      <section className="text-center">
        <Link
          href={instagramProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg shadow-md hover:opacity-90 transition-opacity duration-200 font-medium"
        >
          <FaInstagram className="mr-2 w-5 h-5" />
          Visit our Instagram Profile
        </Link>
      </section>
    </main>
  );
}

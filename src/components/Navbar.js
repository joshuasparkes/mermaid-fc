"use client"; // Needed for useState hooks
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Optional: If you want the logo/name to link home
import { usePathname } from "next/navigation";
// Import necessary icons
import {
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaTimes,
  FaSpinner,
  FaBars,
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Start: Duplicated Modal Logic ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
    message: "",
  });

  // {{ Get current pathname }}
  const pathname = usePathname();

  const handleOpenModal = () => {
    setSubmitStatus({ success: false, error: null, message: "" });
    setIsModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when opening modal
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: null, message: "" });
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/send-enquiry", {
        // Same API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || `Server error: ${response.status}`);
      setSubmitStatus({
        success: true,
        error: null,
        message: result.message || "Trial request sent successfully!",
      });
      event.target.reset();
      setTimeout(() => handleCloseModal(), 2000);
    } catch (err) {
      console.error("Navbar form submission error:", err);
      setSubmitStatus({
        success: false,
        error: true,
        message: err.message || "Failed to send request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- End: Duplicated Modal Logic ---

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked (optional but good UX)
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // {{ Define navigation links for reuse }}
  const navLinks = [
    { href: "/history", label: "Our History" },
    { href: "/player-package", label: "Player Package" },
    { href: "/squad", label: "Our Squad" },
    {
      href: "https://app.veo.co/clubs/the-mermaid-fc/recordings/",
      label: "Watch Matches",
      external: true,
    },
    { href: "/socials", label: "Our Socials" },
    { href: "/sponsor", label: "Sponsor Us" },
  ];

  return (
    <>
      <nav className="bg-black text-white py-3 shadow-md sticky top-0 z-40 border-b-2 border-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-12">
            {/* === Mobile: Left - Trial Button === */}
            <div className="flex items-center md:hidden">
              <button
                onClick={handleOpenModal}
                className="px-3 cursor-pointer py-1.5 bg-orange-500 text-black rounded-md hover:bg-orange-600 transition duration-150 ease-in-out text-sm font-medium shadow-sm"
              >
                Want a Trial?
              </button>
            </div>

            {/* === Desktop: Left - Logo and Brand Name === */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <Image
                  src="/mermaid.jpg"
                  alt="Mermaid FC Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <span className="self-center text-lg text-orange-500 xl:text-xl font-light whitespace-nowrap font-heading">
                  Mermaid FC
                </span>
              </Link>
            </div>

            {/* === Mobile: Center - Brand Name === */}
            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center md:hidden">
              <Link href="/" className="flex items-center">
                <span className="self-center text-base font-semibold whitespace-nowrap text-orange-500 text-center px-2 font-heading">
                  Mermaid FC
                </span>
              </Link>
            </div>

            {/* === Desktop: Center - Navigation Links === */}
            <div className="hidden md:flex flex-1 items-center justify-center space-x-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-gray-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      pathname === link.href
                        ? "text-orange-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* === Desktop: Right - Trial Button === */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <button
                onClick={handleOpenModal}
                className="ml-4 px-4 cursor-pointer py-2 border-orange-500 border text-orange-500 rounded-md hover:bg-orange-600 transition duration-150 ease-in-out text-sm font-medium shadow-sm"
              >
                Want a Trial?
              </button>
            </div>

            {/* === Mobile: Right - Hamburger Menu Button === */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <FaTimes className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* === Mobile Menu Dropdown === */}
        {/* Use transition classes for smooth opening/closing */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-black shadow-lg z-30 transition-transform duration-300 ease-in-out border-t border-gray-700`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMobileLinkClick}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? "bg-gray-900 text-orange-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Duplicated Trial Request / Enquiry Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-scale text-gray-900" // Make sure animation class is defined in globals.css
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-semibold mb-5 text-gray-800">
              Request a Trial / Enquiry
            </h3>
            {submitStatus.message && (
              <div
                className={`mb-4 p-3 rounded text-sm ${submitStatus.error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
              >
                {submitStatus.message}
              </div>
            )}
            {!submitStatus.success && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Form fields are identical to Enquire.js modal */}
                <div>
                  <label
                    htmlFor="navbar-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="navbar-name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="navbar-age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="navbar-age"
                    name="age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="navbar-position"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Position(s)
                  </label>
                  <input
                    type="text"
                    id="navbar-position"
                    name="position"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="navbar-enquiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message / Playing Experience
                  </label>
                  <textarea
                    id="navbar-enquiry"
                    name="enquiry"
                    rows="4"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out font-medium flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : null}
                  {isSubmitting ? "Sending..." : "Send Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

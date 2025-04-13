"use client"; // Need client component for useState (modal)
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // For linking logo to home
import {
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaTimes,
  FaSpinner,
} from "react-icons/fa"; // Import icons

export default function Footer() {
  // --- Start: Duplicated Modal Logic from Enquire.js ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
    message: "",
  });

  const handleOpenModal = () => {
    setSubmitStatus({ success: false, error: null, message: "" });
    setIsModalOpen(true);
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
        // Uses the same API endpoint
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
        message: result.message || "Message sent successfully!",
      });
      event.target.reset();
      setTimeout(() => handleCloseModal(), 2000);
    } catch (err) {
      console.error("Footer form submission error:", err);
      setSubmitStatus({
        success: false,
        error: true,
        message: err.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- End: Duplicated Modal Logic ---

  const phoneNumber = "+447493291667";
  const emailAddress = "joshsparkes6@gmail.com";
  const emailSubject = "Mermaid FC Enquiry";
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer Element */}
      <footer className="bg-gray-900 text-gray-400 pt-10 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-8 mb-8">
            {/* Logo and Brand */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <Image
                  src="/mermaid.jpg" // Path relative to the public folder
                  alt="Mermaid FC Logo"
                  width={50}
                  height={50}
                  className="h-12 w-12 rounded-full" // Slightly larger for footer
                />
                <span className="self-center text-lg font-semibold whitespace-nowrap text-white">
                  Mermaid FC
                </span>
              </Link>
            </div>

            {/* Contact Methods */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              {/* Phone Button */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out text-sm shadow-sm"
                aria-label="Call Us"
              >
                <FaPhone className="mr-2" />
                Call
              </a>
              {/* Email Button */}
              <a
                href={`mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150 ease-in-out text-sm shadow-sm"
                aria-label="Email Us"
              >
                <FaEnvelope className="mr-2" />
                Email
              </a>
              {/* Message Button */}
              <button
                onClick={handleOpenModal}
                className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-150 ease-in-out text-sm shadow-sm"
                aria-label="Send us a message"
              >
                <FaCommentDots className="mr-2" />
                Message
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-700" />

          {/* Copyright */}
          <div className="text-center text-sm">
            &copy; {currentYear} Mermaid FC. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Duplicated Message Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-scale"
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
              Send a Message (Footer)
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
                    htmlFor="footer-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="footer-name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="footer-age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="footer-age"
                    name="age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="footer-position"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Position(s)
                  </label>
                  <input
                    type="text"
                    id="footer-position"
                    name="position"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="footer-enquiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enquiry
                  </label>
                  <textarea
                    id="footer-enquiry"
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

"use client"; // Need client component for useState (modal)
import { useState } from "react";
// import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaCommentDots,
  FaTimes,
  FaSpinner,
} from "react-icons/fa"; // Example icons

export default function Enquire() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
    message: "",
  });

  const phoneNumber = "+447493291667";
  const emailAddress = "joshsparkes6@gmail.com";
  const emailSubject = "Mermaid FC Enquiry";

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      setSubmitStatus({
        success: true,
        error: null,
        message: result.message || "Message sent successfully!",
      });
      event.target.reset();
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitStatus({
        success: false,
        error: true,
        message: err.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-gray-100 mb-4 leading-tight">
        Looking for a Sunday Team?
        <br />
        <span className="text-orange-500"> Join Mermaid FC</span>
      </h2>
      <p className="mb-8 text-base text-gray-300 max-w-xl">
        Based in St. Albans.
        <br />
        Contact us using one of the methods below if you&apos;re interested in
        joining.
      </p>

      <div className="flex flex-wrap justify-start items-center gap-4 mb-6">
        <a
          href={`mailto:${emailAddress}?subject=${encodeURIComponent(
            emailSubject
          )}`}
          className="flex items-center bg-black border border-orange-500 text-orange-500 justify-center w-full sm:w-auto px-6 py-3  text-orange-500 rounded-md hover:bg-orange-700 transition duration-200 ease-in-out text-center font-medium shadow-md"
        >
          <FaEnvelope className="mr-2" />
          Email Us
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center  w-full sm:w-auto px-6 py-3 bg-black border border-orange-500 text-orange-500 rounded-md hover:bg-orange-700 transition duration-200 ease-in-out text-center font-medium shadow-md"
        >
          <FaPhone className="mr-2" />
          Call Us
        </a>
        <button
          onClick={handleOpenModal}
          className="flex cursor-pointer items-center justify-center w-full sm:w-auto px-6 py-3 bg-orange-700 text-white rounded-md hover:bg-orange-600 transition duration-200 ease-in-out text-center font-medium shadow-md"
        >
          <FaCommentDots className="mr-2" />
          Message Us
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-scale text-gray-900"
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
              Send a Message
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
                <div>
                  <label
                    htmlFor="enquire-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="enquire-name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="enquire-age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="enquire-age"
                    name="age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="enquire-position"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Position(s)
                  </label>
                  <input
                    type="text"
                    id="enquire-position"
                    name="position"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="enquire-enquiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enquiry
                  </label>
                  <textarea
                    id="enquire-enquiry"
                    name="enquiry"
                    rows="4"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out font-medium flex items-center justify-center disabled:opacity-50"
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

// --- Optional: Add simple animation to globals.css or tailwind.config.js ---
/* Example for globals.css:
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in-scale {
  animation: fadeInScale 0.2s ease-out forwards;
}
*/

"use client"; // Needed for form state and submission
import { useState } from "react";
import { FaHandshake, FaBullhorn, FaUsers, FaSpinner } from "react-icons/fa"; // Import icons

export default function SponsorPage() {
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
    message: "",
  });

  // Form submission handler
  const handleSponsorshipSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: null, message: "" }); // Reset status

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // POST to the new API route
      const response = await fetch("/api/send-sponsorship-enquiry", {
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

      // Success
      setSubmitStatus({
        success: true,
        error: null,
        message:
          result.message || "Enquiry sent successfully! We will be in touch.",
      });
      event.target.reset(); // Clear the form
    } catch (err) {
      console.error("Sponsorship form submission error:", err);
      setSubmitStatus({
        success: false,
        error: true,
        message:
          err.message || "Failed to send enquiry. Please try again later.",
      });
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <main className="container mx-auto bg-black px-4 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-200 mb-10 md:mb-12">
        Become a Mermaid FC Sponsor
      </h1>

      {/* Layout Container (e.g., two columns on larger screens) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left Column: Why Sponsor Us? */}
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-2xl font-semibold font-heading text-gray-200 mb-4">
            Why Partner with Mermaid FC?
          </h2>

          <div className="flex items-start space-x-4">
            <FaUsers className="w-8 h-8 text-blue-200 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-1">
                Community Engagement
              </h3>
              <p className="text-gray-200">
                Show your support for grassroots football and connect with the
                local St. Albans community. Align your brand with a passionate
                local team.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaBullhorn className="w-8 h-8 text-green-200 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-1">
                Brand Visibility
              </h3>
              <p className="text-gray-200">
                Increase your brand exposure through kit sponsorships,
                pitch-side banners (where applicable), website features, and
                mentions on our social media channels.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaHandshake className="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-1">
                Affordable Marketing
              </h3>
              <p className="text-gray-200">
                Reach a dedicated local audience in a cost-effective way
                compared to traditional advertising channels. Various packages
                are available to suit different budgets.
              </p>
            </div>
          </div>

          <p className="text-gray-200 pt-4">
            We offer a range of sponsorship packages and are happy to discuss
            bespoke opportunities. Get in touch to see how we can work together!
          </p>
        </div>

        {/* Right Column: Sponsorship Enquiry Form */}
        <div className="lg:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold font-heading text-gray-800 mb-6">
            Sponsorship Enquiry
          </h2>

          {/* Display Success/Error Messages */}
          {submitStatus.message && (
            <div
              className={`mb-4 p-3 rounded text-sm ${submitStatus.error ? "bg-red-100 text-red-200" : "bg-green-100 text-green-200"}`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Hide form on success */}
          {!submitStatus.success && (
            <form onSubmit={handleSponsorshipSubmit} className="space-y-5 text-gray-800">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Contact Phone{" "}
                  <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Message / Enquiry
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-3 bg-blue-200 text-white rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out font-medium flex items-center justify-center disabled:opacity-60"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : null}
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          )}
          {/* Show thank you message on success */}
          {submitStatus.success && (
            <div className="text-center mt-6">
              <p className="text-lg text-green-200 font-semibold">
                Thank you for your enquiry!
              </p>
              <p className="text-gray-200">
                We will review your message and get back to you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

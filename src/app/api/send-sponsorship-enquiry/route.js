import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
// Ensure these are set correctly
const toEmail = "joshsparkes6@gmail.com"; // Recipient email
const fromEmail = "onboarding@resend.dev"; // Sending email (verified or Resend's test)

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is missing for sponsorship enquiry.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const body = await request.json();
    // Destructure expected fields for sponsorship
    const { companyName, contactName, contactEmail, contactPhone, message } =
      body;

    // Validation - Adjust required fields as needed
    if (!companyName || !contactName || !contactEmail || !message) {
      return NextResponse.json(
        {
          error: "Company name, contact name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    const subject = `Sponsorship Enquiry from ${companyName}`;
    const htmlContent = `
      <h1>New Mermaid FC Sponsorship Enquiry</h1>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Contact Name:</strong> ${contactName}</p>
      <p><strong>Contact Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></p>
      <p><strong>Contact Phone:</strong> ${contactPhone || "Not provided"}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: `Mermaid FC Website <${fromEmail}>`, // Adjust sender name if desired
      to: [toEmail],
      subject: subject,
      html: htmlContent,
      reply_to: contactEmail, // Set reply-to for easy response
    });

    if (error) {
      console.error("Error sending sponsorship email via Resend:", error);
      const errorMessage = error.message || "Failed to send message.";
      return NextResponse.json(
        { error: `Failed to send message. ${errorMessage}` },
        { status: 500 }
      );
    }

    console.log("Resend sponsorship success data:", data);
    return NextResponse.json(
      { success: true, message: "Sponsorship enquiry sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in send-sponsorship-enquiry API route:", err);
    let errorMessage = "An unexpected error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      errorMessage = "Invalid data format received.";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    return NextResponse.json(
      { error: `An internal server error occurred. ${errorMessage}` },
      { status: 500 }
    );
  }
}

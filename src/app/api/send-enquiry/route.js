import { Resend } from "resend";
import { NextResponse } from "next/server";

// Instantiate Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = "joshsparkes6@gmail.com"; // Your receiving email address
const fromEmail = "onboarding@resend.dev"; // Resend's test email address

export async function POST(request) {
  try {
    // 1. Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is missing.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // 2. Parse the request body (form data)
    const body = await request.json();
    const { name, age, position, enquiry } = body;

    // 3. Basic validation
    if (!name || !enquiry) {
      return NextResponse.json(
        { error: "Name and Enquiry fields are required." },
        { status: 400 }
      );
    }

    // 4. Construct email content
    const subject = `Mermaid FC Enquiry from ${name}`;
    const htmlContent = `
      <h1>New Mermaid FC Enquiry</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age || "Not provided"}</p>
      <p><strong>Preferred Position:</strong> ${position || "Not provided"}</p>
      <hr>
      <p><strong>Enquiry:</strong></p>
      <p>${enquiry.replace(/\n/g, "<br>")}</p> {/* Replace newlines with <br> for HTML */}
    `;

    // 5. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Mermaid FC Enquiry <${fromEmail}>`, // Sender name and email
      to: [toEmail], // Your recipient email address
      subject: subject,
      html: htmlContent,
      // Optional: reply_to: email, // If you collect the user's email and want to reply directly
    });

    // 6. Handle Resend API response
    if (error) {
      console.error("Error sending email via Resend:", error);
      // Provide a more specific error message if possible
      const errorMessage = error.message || "Failed to send message.";
      return NextResponse.json(
        { error: `Failed to send message. ${errorMessage}` },
        { status: 500 }
      );
    }

    console.log("Resend success data:", data);
    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    // Catch any unexpected errors during parsing or processing
    console.error("Error in send-enquiry API route:", err);
    let errorMessage = "An unexpected error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    // Check for JSON parsing errors specifically
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      errorMessage = "Invalid data format received.";
      return NextResponse.json({ error: errorMessage }, { status: 400 }); // Bad Request
    }

    return NextResponse.json(
      { error: `An internal server error occurred. ${errorMessage}` },
      { status: 500 }
    );
  }
}

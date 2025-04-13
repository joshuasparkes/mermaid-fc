export default function Enquire() {
  return (
    <div className="p-4 border rounded shadow-md h-full">
      {" "}
      {/* Basic container styling, h-full helps alignment in flex */}
      <h2 className="text-lg font-semibold mb-3">Enquire</h2>
      <p className="mb-4">
        Interested in joining the team or have any questions?
      </p>
      <p>
        Please contact us via email:
        <br />
        <a
          href="mailto:your-email@example.com"
          className="text-blue-600 hover:underline"
        >
          your-email@example.com {/* <-- Replace with actual email */}
        </a>
      </p>
      {/* You could add a contact form here later */}
    </div>
  );
}

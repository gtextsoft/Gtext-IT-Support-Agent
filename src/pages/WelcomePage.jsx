import React from "react";

const WelcomePage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold text-black-700 mb-4">
          Welcome to the Gtext IT Support Agent
        </h1>
        <p className="text-gray-700 mb-6">
          Your one-stop assistant for IT support, account setup, and quick fixes.
          Here’s how to make the most of it:
        </p>

        <ol className="text-left space-y-4">
        <li>
            <strong>1. File Complaints:</strong> Go to{" "}
            <span className="text-green-600 font-semibold">“Complaint Bar”</span> to
            report IT issues. Our AI Agent will guide you or escalate to IT staff.
          </li>

          <li>
            <strong>2. Create ERP & Gtext Mail:</strong> Use the{" "}
            <span className="text-blue-600 font-semibold">“Create ERP & Gtext Mail”</span>{" "}
            bar to set up new staff accounts instantly after filling the Google Form. <strong>Currently restricted to HR & GCOO for test purposes.</strong>
          </li>
       
          <li>
            <strong>3. Deactivate Ex-Employees:</strong> HR can use the{" "}
            <span className="text-red-600 font-semibold">“Deactivate Email”</span>{" "}
            section to suspend ex-staff email accounts.
          </li>
  <br />
          <li>
            <strong>Upcoming :</strong> Book Meetings & Create zoom links for staff, management or events, Generate QR codes, submit suggestions,
            or watch our app usage guide anytime.
          </li>
        </ol>

        <p className="mt-6 text-gray-600">
          Tip: For best results, keep your requests short and clear.  
           Let’s get started!
        </p>

        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
          onClick={() => window.location.href = "/complaint"}
        >
          You got a complaint?
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

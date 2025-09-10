import React, { useState, useEffect, useRef } from "react";

export default function CreateERPAndMail() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState({});
  const [verified, setVerified] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const iframeRef = useRef(null);

  // Poll automation status if processing
  useEffect(() => {
    let interval;
    if (status === "processing") {
      interval = setInterval(() => {
        // fetch("http://localhost:5000/api/automation-status")
        fetch("https://gtextitagentapi.onrender.com/api/automation-status")
          .then((res) => res.json())
          .then((res) => {
            setStatus(res.status);
            setData(res.data || {});
          })
          .catch(() => {});
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      // const res = await fetch("http://localhost:5000/api/verify-code", {
      const res = await fetch(
        "https://gtextitagentapi.onrender.com/api/verify-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: passcode }),
        }
      );
      if (!res.ok) throw new Error("Invalid code");

      setVerified(true);
      setError("");
    } catch (err) {
      setError("❌ Incorrect code. Access denied.");
    }
  };

  // Trigger backend immediately when HR finishes form
  const handleFormSubmitClick = async () => {
    setStatus("processing"); // Show animation instantly
    try {
      // await fetch("http://localhost:5000/api/trigger-mail-erp", {
      await fetch("https://gtextitagentapi.onrender.com/api/trigger-mail-erp", {
        method: "POST",
      });
    } catch {
      setStatus("idle");
      alert("Failed to start automation.");
    }
  };

  if (!verified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🔒 Restricted Access
          </h2>
          <p className="mb-4 text-gray-600 text-center">
            Enter the access code to proceed.
          </p>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter code"
            className="w-full px-4 py-2 border rounded mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            onClick={handleVerify}
            disabled={verifying}
            // className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            className={`w-full py-2 rounded text-white ${
              verifying
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {/* Verify */}
            {verifying ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      {status === "idle" && (
        <>
          <h2 className="text-2xl font-bold mb-2">
            Create Your ERP & Gtext Mail
          </h2>
          <p className="mb-4">
            Use your personal email and your phone number to create your
            gtextmail 🥳
          </p>
          <p className="mb-4 font-bold">
            {" "}
            Click the start processing button after submitting form{" "}
          </p>
          <p className="mb-4 italic">
            Note: Processes might be slow due to free API versions
          </p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfRSDd3FwTu3SOre0V8yw6mFEMWRFYn2U4FORYmjNYGB3EB7Q/viewform?embedded=true"
            width="640"
            height="1249"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
          <div className="mt-4 text-center">
            <button
              onClick={handleFormSubmitClick}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              I've Submitted the Form → Start Processing
            </button>
          </div>
        </>
      )}

      {status === "processing" && (
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold text-blue-700 mb-4">
            Processing...
          </p>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-full bg-blue-600 animate-pulse w-2/3 rounded"></div>
          </div>
        </div>
      )}

      {status === "completed" && (
        <div className="text-green-600">
          <h3 className="text-xl font-bold">🎉 Completed!</h3>
          <p className="mb-2">
            Your Gtext mail: <strong>{data.gtextMail}</strong> <br />
            ERP setup instructions have been sent to your WhatsApp.
          </p>
          <p>Congratulations {data.name} 🎉</p>
        </div>
      )}
    </div>
  );
}

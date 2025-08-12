import React, { useState } from "react";

export default function DeactivateEmployeeMail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  // const [accessGranted, setAccessGranted] = useState(false);
  // const [codeInput, setCodeInput] = useState("");

  const [verified, setVerified] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleDeactivate = async () => {
    setStatus("Processing...");
    // const res = await fetch("http://localhost:5000/api/deactivate-mail", {
    const res = await fetch(
      "https://it-agent-q1dz.onrender.com/api/deactivate-mail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const result = await res.json();
    setStatus(result.success ? "Deactivated successfully!" : result.message);
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      // const res = await fetch("http://localhost:5000/api/verify-code", {
      const res = await fetch(
        "https://it-agent-q1dz.onrender.com/api/verify-code",
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

  // const handleCodeSubmit = () => {
  //   if (codeInput.trim() === "GTEXTAICHALLENGE") {
  //     setAccessGranted(true);
  //   } else {
  //     alert("❌ Invalid access code. Please contact HR or GCOO.");
  //   }
  // };

  //   // 🔹 Show access code prompt if not granted

  // if (!accessGranted) {
  //   return (
  //     <div className="p-6 bg-white rounded-lg shadow-md mt-6 text-center">
  //       <h2 className="text-xl font-bold mb-4">Enter Access Code</h2>
  //       <input
  //         type="password"
  //         placeholder="Enter code"
  //         value={codeInput}
  //         onChange={(e) => setCodeInput(e.target.value)}
  //         className="border p-2 rounded w-64 mb-4"
  //       />
  //       <br />
  //       <button
  //         onClick={handleCodeSubmit}
  //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //       >
  //         Submit
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-2">
        Deactivate Ex-Employee Gtext Mail
      </h2>
      <input
        type="text"
        placeholder="Enter ex employee gtext email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleDeactivate}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Deactivate
      </button>
      <p className="mt-3 text-sm text-gray-700">{status}</p>
    </div>
  );
}

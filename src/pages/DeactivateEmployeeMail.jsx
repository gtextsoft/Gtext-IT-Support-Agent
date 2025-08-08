import React, { useState } from "react";

export default function DeactivateEmployeeMail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  const handleDeactivate = async () => {
    setStatus("Processing...");
    const res = await fetch("https://it-agent-q1dz.onrender.com/api/deactivate-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    setStatus(result.success ? "Deactivated successfully!" : result.message);
  };

  const handleCodeSubmit = () => {
    if (codeInput.trim() === "GTEXTAICHALLENGE") {
      setAccessGranted(true);
    } else {
      alert("❌ Invalid access code. Please contact HR or GCOO.");
    }
  };
  
    // 🔹 Show access code prompt if not granted
    
  if (!accessGranted) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md mt-6 text-center">
        <h2 className="text-xl font-bold mb-4">Enter Access Code</h2>
        <input
          type="password"
          placeholder="Enter code"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="border p-2 rounded w-64 mb-4"
        />
        <br />
        <button
          onClick={handleCodeSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-2">Deactivate Ex-Employee Gtext Mail</h2>
      <input
        type="text"
        placeholder="Enter employee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />
      <button
        // onClick={handleDeactivate}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Deactivate
      </button>
      <p className="mt-3 text-sm text-gray-700">{status}</p>
    </div>
  );
}

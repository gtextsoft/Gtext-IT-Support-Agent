// // components/DeactivateEmployeeMail.jsx
// import React, { useState } from 'react';

// const DeactivateEmployeeMail = () => {
//   const [email, setEmail] = useState('');
//   const [response, setResponse] = useState(null);

//   const handleDeactivate = async () => {
//     const res = await fetch('http://localhost:5000/api/deactivate-mail', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email }),
//     });
//     const data = await res.json();
//     setResponse(data);
//   };

//   return (
//     <div className="bar">
//       <h2>Deactivate Ex-Employee Gtext Mail</h2>
//       <input
//         type="email"
//         placeholder="Enter Gtext email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleDeactivate}>Deactivate</button>
//       {response && (
//         <p>{response.message}</p>
//       )}
//     </div>
//   );
// };

// export default DeactivateEmployeeMail;

import React, { useState } from "react";

export default function DeactivateEmployeeMail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleDeactivate = async () => {
    setStatus("Processing...");
    const res = await fetch("http://localhost:5000/api/deactivate-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    setStatus(result.success ? "Deactivated successfully!" : result.message);
  };

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
        onClick={handleDeactivate}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Deactivate
      </button>
      <p className="mt-3 text-sm text-gray-700">{status}</p>
    </div>
  );
}

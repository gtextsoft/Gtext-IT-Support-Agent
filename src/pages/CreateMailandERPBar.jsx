

// import React, { useState, useEffect } from "react";
// import ProcessingScreen from "../components/ProcessingScreen";

// export default function CreateERPAndMail() {
//   const [status, setStatus] = useState("idle");
//   const [data, setData] = useState({});
//   const [verified, setVerified] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (status === "processing") {
//         // fetch("https://it-agent-q1dz.onrender.com/api/automation-status")
//         fetch("http://localhost:5000/api/automation-status")
//           .then((res) => res.json())
//           .then((res) => {
//             setStatus(res.status);
//             setData(res.data || {});
//           });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [status]);

//   const startProcessing = () => {
//     setStatus("processing");
//   };

//   const handleVerify = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/verify-code", {
//       // const res = await fetch("https://it-agent-q1dz.onrender.com/api/verify-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code: passcode }),
//       });

//       if (!res.ok) throw new Error("Invalid code");

//       setVerified(true);
//       setError("");
//     } catch (err) {
//       setError("❌ Incorrect code. Access denied.");
//     }
//   };

//   if (!verified) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">🔒 Restricted Access</h2>
//           <p className="mb-4 text-gray-600 text-center">
//             Enter the access code to proceed.
//           </p>
//           <input
//             type="password"
//             value={passcode}
//             onChange={(e) => setPasscode(e.target.value)}
//             placeholder="Enter code"
//             className="w-full px-4 py-2 border rounded mb-3"
//           />
//           {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//           <button
//             onClick={handleVerify}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Verify
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md mt-6">
//       {status === "idle" && (
//         <>
//           <h2 className="text-2xl font-bold mb-2">Create ERP & Gtext Mail</h2>
//           <p className="mb-4">Click below to submit your details.</p>
//           <a
//             href="https://docs.google.com/forms/d/e/1FAIpQLSeL2Q26J-Yu-wo9Vxew91QMDE6q_sEMscX1pSQ_vKcsXI3UIQ/viewform" // your form link
//             onClick={startProcessing}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Go to Google Form
//           </a>
//         </>
//       )}

//       {status === "processing" && (
//         <div className="flex flex-col items-center">
//           <p className="text-lg font-semibold text-blue-700 mb-4">Processing...</p>
//           <div className="w-full h-2 bg-gray-200 rounded">
//             <div className="h-full bg-blue-600 animate-pulse w-2/3 rounded"></div>
//           </div>
//         </div>
//       )}

//       {status === "completed" && (
//         <div className="text-green-600">
//           <h3 className="text-xl font-bold">Completed!</h3>
//           <p className="mb-2">
//             Your Gtext mail: <strong>{data.gtextMail}</strong> <br />
//             ERP setup instructions have been sent to your WhatsApp.
//           </p>
//           <p>Congratulations {data.name} 🎉</p>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";

// export default function CreateERPAndMail() {
//   const [status, setStatus] = useState("idle");
//   const [data, setData] = useState({});
//   const [verified, setVerified] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const [error, setError] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (status === "processing") {
//       interval = setInterval(() => {
//         fetch("http://localhost:5000/api/automation-status")
//           .then((res) => res.json())
//           .then((res) => {
//             setStatus(res.status);
//             setData(res.data || {});
//           })
//           .catch(() => {});
//       }, 3000);
//     }
//     return () => clearInterval(interval);
//   }, [status]);

//   const handleVerify = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/verify-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code: passcode }),
//       });
//       if (!res.ok) throw new Error("Invalid code");

//       setVerified(true);
//       setError("");
//     } catch (err) {
//       setError("❌ Incorrect code. Access denied.");
//     }
//   };

//   const triggerAutomation = async () => {
//     setStatus("processing");
//     try {
//       await fetch("http://localhost:5000/api/trigger-mail-erp", {
//         method: "POST",
//       });
//     } catch {
//       setStatus("idle");
//       alert("Failed to start automation.");
//     }
//   };

//   if (!verified) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">🔒 Restricted Access</h2>
//           <p className="mb-4 text-gray-600 text-center">Enter the access code to proceed.</p>
//           <input
//             type="password"
//             value={passcode}
//             onChange={(e) => setPasscode(e.target.value)}
//             placeholder="Enter code"
//             className="w-full px-4 py-2 border rounded mb-3"
//           />
//           {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//           <button
//             onClick={handleVerify}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Verify
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md mt-6">
//       {status === "idle" && !formSubmitted && (
//         <>
//           <h2 className="text-2xl font-bold mb-2">Create ERP & Gtext Mail</h2>
//           <p className="mb-4">Click below to submit your details via Google Form.</p>
//           <a
//             href="https://docs.google.com/forms/d/e/1FAIpQLSeL2Q26J-Yu-wo9Vxew91QMDE6q_sEMscX1pSQ_vKcsXI3UIQ/viewform"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => setFormSubmitted(true)}
//           >
//             Go to Google Form
//           </a>
//         </>
//       )}

//       {status === "idle" && formSubmitted && (
//         <>
//           <h2 className="text-2xl font-bold mb-2">✅ Form Submitted</h2>
//           <p className="mb-4 text-gray-700">
//             Now click the button below to trigger the automation process.
//           </p>
//           <button
//             onClick={triggerAutomation}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Trigger Automation
//           </button>
//         </>
//       )}

//       {status === "processing" && (
//         <div className="flex flex-col items-center">
//           <p className="text-lg font-semibold text-blue-700 mb-4">Processing...</p>
//           <div className="w-full h-2 bg-gray-200 rounded">
//             <div className="h-full bg-blue-600 animate-pulse w-2/3 rounded"></div>
//           </div>
//         </div>
//       )}

//       {status === "completed" && (
//         <div className="text-green-600">
//           <h3 className="text-xl font-bold">🎉 Completed!</h3>
//           <p className="mb-2">
//             Your Gtext mail: <strong>{data.gtextMail}</strong> <br />
//             ERP setup instructions have been sent to your WhatsApp.
//           </p>
//           <p>Congratulations {data.name} 🎉</p>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";

// export default function CreateERPAndMail() {
//   const [status, setStatus] = useState("idle");
//   const [data, setData] = useState({});
//   const [verified, setVerified] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const [error, setError] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const iframeRef = useRef(null);

//   // Poll automation status if processing
//   useEffect(() => {
//     let interval;
//     if (status === "processing") {
//       interval = setInterval(() => {
//         fetch("http://localhost:5000/api/automation-status")
//           .then((res) => res.json())
//           .then((res) => {
//             setStatus(res.status);
//             setData(res.data || {});
//           })
//           .catch(() => {});
//       }, 3000);
//     }
//     return () => clearInterval(interval);
//   }, [status]);

//   // Detect form submission in iframe
//   useEffect(() => {
//     const checkSubmission = () => {
//       try {
//         const iframeURL = iframeRef.current?.contentWindow?.location?.href;
//         if (iframeURL && iframeURL.includes("formResponse")) {
//           console.log("✅ Google Form submitted!");
//           setFormSubmitted(true);
//           triggerAutomation();
//         }
//       } catch {
//         // Cross-origin access error — ignore
//       }
//     };

//     const interval = setInterval(checkSubmission, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleVerify = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/verify-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code: passcode }),
//       });
//       if (!res.ok) throw new Error("Invalid code");

//       setVerified(true);
//       setError("");
//     } catch (err) {
//       setError("❌ Incorrect code. Access denied.");
//     }
//   };

//   const triggerAutomation = async () => {
//     setStatus("processing");
//     try {
//       await fetch("http://localhost:5000/api/trigger-mail-erp", {
//         method: "POST",
//       });
//     } catch {
//       setStatus("idle");
//       alert("Failed to start automation.");
//     }
//   };

//   if (!verified) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">🔒 Restricted Access</h2>
//           <p className="mb-4 text-gray-600 text-center">Enter the access code to proceed.</p>
//           <input
//             type="password"
//             value={passcode}
//             onChange={(e) => setPasscode(e.target.value)}
//             placeholder="Enter code"
//             className="w-full px-4 py-2 border rounded mb-3"
//           />
//           {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//           <button
//             onClick={handleVerify}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Verify
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md mt-6">
//       {status === "idle" && !formSubmitted && (
//         <>
//           <h2 className="text-2xl font-bold mb-2">Create ERP & Gtext Mail</h2>
//           <p className="mb-4">Please fill in the form below:</p>
//           <iframe
//             ref={iframeRef}
//             src="https://docs.google.com/forms/d/e/1FAIpQLSeL2Q26J-Yu-wo9Vxew91QMDE6q_sEMscX1pSQ_vKcsXI3UIQ/viewform"
//             width="100%"
//             height="600"
//             frameBorder="0"
//             marginHeight="0"
//             marginWidth="0"
//             title="ERP & Gtext Mail Form"
//           >
//             Loading…
//           </iframe>
//         </>
//       )}

//       {status === "processing" && (
//         <div className="flex flex-col items-center">
//           <p className="text-lg font-semibold text-blue-700 mb-4">Processing...</p>
//           <div className="w-full h-2 bg-gray-200 rounded">
//             <div className="h-full bg-blue-600 animate-pulse w-2/3 rounded"></div>
//           </div>
//         </div>
//       )}

//       {status === "completed" && (
//         <div className="text-green-600">
//           <h3 className="text-xl font-bold">🎉 Completed!</h3>
//           <p className="mb-2">
//             Your Gtext mail: <strong>{data.gtextMail}</strong> <br />
//             ERP setup instructions have been sent to your WhatsApp.
//           </p>
//           <p>Congratulations {data.name} 🎉</p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";

export default function CreateERPAndMail() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState({});
  const [verified, setVerified] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const iframeRef = useRef(null);

  // Poll automation status if processing
  useEffect(() => {
    let interval;
    if (status === "processing") {
      interval = setInterval(() => {
        // fetch("http://localhost:5000/api/automation-status")
        fetch("https://it-agent-q1dz.onrender.com/api/automation-status")
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
    try {
      // const res = await fetch("http://localhost:5000/api/verify-code", {
      const res = await fetch("https://it-agent-q1dz.onrender.com/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: passcode }),
      });
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
      await fetch("https://it-agent-q1dz.onrender.com/api/trigger-mail-erp", {
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
          <h2 className="text-2xl font-bold mb-4 text-center">🔒 Restricted Access</h2>
          <p className="mb-4 text-gray-600 text-center">Enter the access code to proceed.</p>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Verify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      {status === "idle" && (
        <>
          <h2 className="text-2xl font-bold mb-2">Create ERP & Gtext Mail</h2>
          <p className="mb-4">Please fill in the form below:</p>
          <iframe
            ref={iframeRef}
            src="https://docs.google.com/forms/d/e/1FAIpQLSeL2Q26J-Yu-wo9Vxew91QMDE6q_sEMscX1pSQ_vKcsXI3UIQ/viewform"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="ERP & Gtext Mail Form"
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
          <p className="text-lg font-semibold text-blue-700 mb-4">Processing...</p>
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


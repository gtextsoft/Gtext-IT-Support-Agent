import React, { useState, useEffect } from "react";
import ProcessingScreen from "../components/ProcessingScreen";

export default function CreateERPAndMail() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === "processing") {
        fetch("https://it-agent-q1dz.onrender.com/api/automation-status")
          .then((res) => res.json())
          .then((res) => {
            setStatus(res.status);
            setData(res.data || {});
          });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  const startProcessing = () => {
    setStatus("processing");
  };

//   if (status === "processing") {
//     return <ProcessingScreen />;
//   }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      {status === "idle" && (
        <>
          <h2 className="text-2xl font-bold mb-2">Create ERP & Gtext Mail</h2>
          <p className="mb-4">Click below to submit your details.</p>
          <a
            // href="https://docs.google.com/forms/d/e/1FAIpQLSeL2Q26J-Yu-wo9Vxew91QMDE6q_sEMscX1pSQ_vKcsXI3UIQ/viewform" // your form link
            onClick={startProcessing}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Google Form
          </a>
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
          <h3 className="text-xl font-bold">Completed!</h3>
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

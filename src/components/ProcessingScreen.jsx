// components/ProcessingScreen.jsx
import React, { useEffect, useState } from 'react';

const ProcessingScreen = () => {
  const [status, setStatus] = useState('processing'); // 'processing' | 'done'
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Poll backend for completion
    const interval = setInterval(async () => {
      const res = await fetch('https://it-agent-q1dz.onrender.com/api/automation-status'); // or your backend URL
      const data = await res.json();
      if (data?.status === 'done') {
        setUserDetails(data.user);
        setStatus('done');
        clearInterval(interval);
      }
    }, 5000); // check every 5s

    return () => clearInterval(interval);
  }, []);

  if (status === 'processing') {
    return (
      <div className="processing">
        <h3>Processing...</h3>
        <div className="loader-line" />
        <p>Please wait while we create your ERP profile and email.</p>
      </div>
    );
  }

  return (
    <div className="completed">
      <h2>Completed!</h2>
      <p>
        Your Gtext mail: <strong>{userDetails.gtextEmail}</strong><br />
        ERP profile created. Please check your personal mail to set up your Gtext mail and your WhatsApp for activation steps.
      </p>
      <h3>Congratulations {userDetails.firstName}!</h3>
    </div>
  );
};

export default ProcessingScreen;

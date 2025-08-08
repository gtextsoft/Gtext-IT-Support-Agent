import React from "react";

const ScheduleMeeting = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        Schedule a Meeting
      </h3>
      <p className="text-gray-600 mb-4">
        Need help? Book a one-on-one session with the IT team.
      </p>
      <a
        href="https://calendly.com/olamilesiadeola111/mentorship-call-with-thrive"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
      >
        Book Now
      </a>
    </div>
  );
};

export default ScheduleMeeting;

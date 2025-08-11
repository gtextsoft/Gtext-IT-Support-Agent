import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComplaintChat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    // setMessages([...messages, userMessage]);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
    const res = await fetch("https://it-agent-q1dz.onrender.com/api/complaint-agent", {
    // const res = await fetch("http://localhost:5000/api/complaint-agent", {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botReply = data.reply || "";

    // Check if reply has a scheduling offer
    const hasScheduleOffer = /schedule (a )?meeting/i.test(botReply);

    if (data.reply.startsWith("Redirect:")) {
      navigate(data.reply.replace("Redirect:", "").trim());
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "agent",
        content: botReply,
        showScheduleButton: hasScheduleOffer, // flag to render button
      },
    ]);
  }catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: "agent", content: "⚠️ There was an error. Please try again." },
    ]);
  } finally {
    setLoading(false);
  }
};

const handleScheduleClick = () => {
  navigate("/schedule-meeting");
};


  return (
    <div className="border rounded-lg p-4 bg-white shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Ask IT Support</h2>
      <div className="h-64 overflow-y-auto mb-2 border p-2">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <p
              className={
                msg.role === "user" ? "text-blue-700" : "text-green-700"
              }
            >
              <strong>{msg.role === "user" ? "You" : "Agent"}:</strong>{" "}
              {msg.content}
            </p>
            {msg.showScheduleButton && (
              <button
                className="mt-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                onClick={handleScheduleClick}
              >
                📅 Schedule Meeting
              </button>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center text-gray-500">
            <svg
              className="animate-spin h-4 w-4 mr-2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Thinking...
          </div>
        )}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask IT Support About ERP and Gtext Mail..."
        className="border w-full p-2 mb-2"
        disabled={loading}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        Send
      </button>
    </div>

    // <div className="border rounded-lg p-4 bg-white shadow mt-4">
    //   <h2 className="text-lg font-semibold mb-2">Ask IT Support</h2>
    //   <div className="h-64 overflow-y-auto mb-2 border p-2">
    //     {messages.map((msg, i) => (
    //       <p
    //         key={i}
    //         className={msg.role === "user" ? "text-blue-700" : "text-green-700"}
    //       >
    //         <strong>{msg.role === "user" ? "You" : "Agent"}:</strong>{" "}
    //         {msg.content}
    //       </p>
    //     ))}
    //       {loading && (
    //       <div className="flex items-center text-gray-500">
    //         <svg
    //           className="animate-spin h-4 w-4 mr-2 text-gray-500"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //         >
    //           <circle
    //             className="opacity-25"
    //             cx="12"
    //             cy="12"
    //             r="10"
    //             stroke="currentColor"
    //             strokeWidth="4"
    //           ></circle>
    //           <path
    //             className="opacity-75"
    //             fill="currentColor"
    //             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    //           ></path>
    //         </svg>
    //         Thinking...
    //       </div>
    //     )}
    //   </div>
    //   <input
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //     placeholder="Ask something..."
    //     className="border w-full p-2 mb-2"
    //     disabled={loading}
    //   />
    //   <button
    //     onClick={sendMessage}
    //     className="bg-blue-600 text-white px-4 py-2 rounded"
    //     disabled={loading}
    //   >
    //     Send
    //   </button>
    // </div>
  );
}

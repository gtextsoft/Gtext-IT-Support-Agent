import React, { useState } from "react";

export default function ComplaintChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
    const res = await fetch("https://it-agent-q1dz.onrender.com/api/complaint-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([
      ...messages,
      userMessage,
      { role: "agent", content: data.reply },
    ]);
    setInput("");
  }catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: "agent", content: "⚠️ There was an error. Please try again." },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="border rounded-lg p-4 bg-white shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Ask IT Support</h2>
      <div className="h-64 overflow-y-auto mb-2 border p-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={msg.role === "user" ? "text-blue-700" : "text-green-700"}
          >
            <strong>{msg.role === "user" ? "You" : "Agent"}:</strong>{" "}
            {msg.content}
          </p>
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
        placeholder="Ask something..."
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
  );
}

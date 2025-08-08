// import React, { useState } from "react";

// const faq = {
//   "My email is not logging in": "Try using the default password sent to your WhatsApp. If not, reset using your recovery email.",
//   "I can't access ERP": "Make sure you're using your official email. If the issue persists, submit a complaint.",
//   "I forgot my email password": "Click 'Forgot password' on the login page and follow the recovery steps.",
// };

// const Complaint = () => {
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState("");

//   const handleAsk = () => {
//     const answer = faq[query.trim()];
//     if (answer) {
//       setResponse(answer);
//     } else {
//       setResponse("Hmm... I don't have an answer to that yet. Please schedule a meeting for help.");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Ask the IT Agent</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask about email or ERP..."
//           className="w-full p-2 border rounded mb-2"
//         />
//         <button
//           onClick={handleAsk}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Ask
//         </button>
//       </div>
//       {response && (
//         <div className="bg-gray-100 p-4 rounded border">
//           <strong>Agent:</strong> {response}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Complaint;


import React, { useState } from 'react';

export default function ComplaintChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const res = await fetch("http://localhost:5000/api/complaint-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([...messages, userMessage, { role: "agent", content: data.reply }]);
    setInput("");
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Ask IT Support</h2>
      <div className="h-64 overflow-y-auto mb-2 border p-2">
        {messages.map((msg, i) => (
          <p key={i} className={msg.role === "user" ? "text-blue-700" : "text-green-700"}>
            <strong>{msg.role === "user" ? "You" : "Agent"}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Ask something..."
        className="border w-full p-2 mb-2"
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}

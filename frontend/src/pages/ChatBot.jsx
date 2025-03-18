import { FaCommentDots, FaTimes, FaUser, FaRobot } from "react-icons/fa";
import { useState } from "react";
import "./chat.css"; // Make sure chat.css is properly linked

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { role: "bot", text: "Error fetching response. Please try again." }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button onClick={toggleChatbot} className="chat-toggle">
        {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
      </button>

      {/* Chatbot Container */}
      <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
        <h1 className="chat-head">CHATBOT</h1>

        {/* Chat messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-msg ${msg.role}`}>
              {msg.role === "user" ? <FaUser className="user-icon" /> : <FaRobot className="bot-icon" />}
              <p>{msg.text}</p>
            </div>
          ))}
          {loading && <div className="chat-msg bot"><FaRobot className="bot-icon" /> Chatbot is typing...</div>}
        </div>

        {/* Input and Send Button */}
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button id="chatBTN" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;

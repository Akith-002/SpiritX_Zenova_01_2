import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Spiriter.css";

const Spiriter = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm Spiriter! I can help you with player information, statistics, and team recommendations. How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: "user" }]);
    setIsLoading(true);

    try {
      // Send request to backend
      const response = await axios.post("http://localhost:5000/api/spiriter", {
        message: input,
      });

      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        { text: response.data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble processing your request right now. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="spiriter-container">
      <div className="spiriter-header">
        <h2>Spiriter</h2>
        <p>Your Fantasy Cricket Assistant</p>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-bubble">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about players or team recommendations..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ""}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spiriter;

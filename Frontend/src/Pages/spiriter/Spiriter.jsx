import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Send, User, Bot } from "lucide-react";
import styles from "./Spiriter.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import GitHub-flavored markdown support

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
      const response = await fetch("http://localhost:3000/api/spiriter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();

      // Add bot response to chat
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
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

  const formatMessage = (text) => {
    return (
      <ReactMarkdown
        children={text}
        remarkPlugins={[remarkGfm]} // Add GFM support for better markdown handling
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Navbar />
      </div>
      <div className={styles.right}>
        <main className={styles.main}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Spiriter</h1>
              <p className={styles.subtitle}>Your Fantasy Cricket Assistant</p>
            </div>
          </header>

          <div className={styles.chatContainer}>
            <div className={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${styles[message.sender]}`}
                >
                  <div className={styles.messageIcon}>
                    {message.sender === "bot" ? (
                      <Bot size={20} className={styles.botIcon} />
                    ) : (
                      <User size={20} className={styles.userIcon} />
                    )}
                  </div>
                  <div className={styles.messageBubble}>
                    {formatMessage(message.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.bot}`}>
                  <div className={styles.messageIcon}>
                    <Bot size={20} className={styles.botIcon} />
                  </div>
                  <div className={`${styles.messageBubble} ${styles.typing}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about players or team recommendations..."
                disabled={isLoading}
                className={styles.chatInput}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || input.trim() === ""}
                className={styles.sendButton}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Spiriter;

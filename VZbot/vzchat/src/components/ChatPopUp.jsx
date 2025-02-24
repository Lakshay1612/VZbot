import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import "./ChatPopUp.css";

const ChatPopUp = ({ userID, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: `Hey there, ${user.name}! 😊 How can I make your day better? 🚀`,
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const chatEndRef = useRef(null);

  const sampleQuestions = [
    "What is my current plan?",
    "Help me troubleshoot my slow internet.",
    "Where is my order?",
    "Can I upgrade my current plan?",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setShowQuestions(false);
    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chatbot/message",
        {
          userId: userID,
          message,
        }
      );

      setIsTyping(false);

      const botMessages = Array.isArray(response.data)
        ? response.data.map((msg) => ({ text: msg.text, sender: "bot" }))
        : [{ text: response.data.response, sender: "bot" }];

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to get response", sender: "bot" },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleChat}>
        💬
      </button>

      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>VZ Chat Assistant</h3>
            <button onClick={toggleChat} className="close-btn">
              ✖
            </button>
          </div>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} />
            ))}

            {isTyping && (
              <div className="typing-container">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {showQuestions && (
            <div className="sample-questions">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className="question-capsule"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopUp;

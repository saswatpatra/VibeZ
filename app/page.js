"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState([]); // Store previous chat sessions

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Ensure input isn't just whitespace

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { 
        role: "bot", 
        content: data.response || "Yo, something’s glitchy—check my vibe later, fam! 💀🔥" 
      };

      setMessages([...messages, newMessage, botMessage]);

      // Save this chat session (e.g., first message as a summary)
      setChatSessions([
        ...chatSessions,
        { 
          id: Date.now(), 
          summary: `You: ${input} | VibeZ: ${data.response?.slice(0, 20) || "No response"}...` 
        },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error.message);
      const errorMessage = { role: "bot", content: "Yo, something’s glitchy—check my vibe later, fam! 💀🔥" };
      setMessages([...messages, newMessage, errorMessage]);
      setChatSessions([
        ...chatSessions,
        { id: Date.now(), summary: `You: ${input} | VibeZ: Error...` },
      ]);
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      background: "#1a1a1a", // Royal black background, solid and sleek
      color: "#fff", 
      fontFamily: "Arial, sans-serif", // Default font, can be overridden
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    }}>
      <div style={{ 
        display: "flex", 
        width: "100%",
        maxWidth: "1200px", 
        gap: "10px",
        margin: "0 auto" // Center content on larger screens
      }}>
        {/* Collapsible Sidebar for Previous Chats */}
        <div style={{ 
          width: sidebarOpen ? "250px" : "0", 
          transition: "width 0.3s ease",
          background: "#2d2d2d", // Dark sidebar background
          borderRight: "1px solid #333",
          overflow: "hidden",
          height: "calc(100vh - 40px)",
          position: "fixed",
          left: 0,
          top: "20px",
          zIndex: 1000
        }}>
          <h2 style={{ 
            color: "#ffcc00", // Neon yellow for Gen Z
            padding: "10px",
            textAlign: "center",
            textShadow: "0 0 10px #ffcc00"
          }}>Previous Vibes 🌀</h2>
          <ul style={{ 
            listStyle: "none", 
            padding: "0",
            margin: "0"
          }}>
            {chatSessions.map((session) => (
              <li key={session.id} style={{ 
                padding: "10px",
                borderBottom: "1px solid #333",
                cursor: "pointer",
                color: "#fff"
              }}>
                {session.summary}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Chat Area */}
        <div style={{ 
          flex: 1,
          marginLeft: sidebarOpen ? "260px" : "0", // Adjust margin for sidebar
          transition: "margin 0.3s ease"
        }}>
          <h1 style={{ 
            color: "#ff6f61", // Neon pink for Gen Z heading
            textAlign: "center", 
            marginBottom: "20px",
            fontSize: "2.5rem",
            textShadow: "0 0 15px #ff6f61", // Glow effect for modern Gen Z look
            fontFamily: "'Impact', sans-serif" // Bold, web-safe Gen Z-friendly font
          }}>VibeZ Chatbot</h1>
          <div style={{ 
            width: "100%",
            maxWidth: "600px", 
            margin: "0 auto",
            border: "1px solid #333", 
            borderRadius: "15px",
            overflow: "hidden",
            background: "#2d2d2d", // Slightly lighter dark for chat area
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" // Modern shadow
          }}>
            <div style={{ 
              height: "500px", 
              overflowY: "auto", 
              padding: "15px",
              background: "#2d2d2d"
            }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ 
                  margin: "15px 0", 
                  textAlign: msg.role === "user" ? "right" : "left"
                }}>
                  <span style={{ 
                    background: msg.role === "user" ? "#4a90e2" : "#444", // Blue for user, dark gray for bot
                    color: "#fff",
                    padding: "12px 18px",
                    borderRadius: "20px", // More rounded bubbles for modern look
                    display: "inline-block",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                  }}>
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ 
              padding: "15px", 
              background: "#1a1a1a",
              display: "flex",
              gap: "15px",
              borderTop: "1px solid #333",
              alignItems: "center"
            }}>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ 
                  padding: "8px 16px", 
                  background: "#ffcc00", // Neon yellow for Gen Z
                  color: "#000",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}
              >
                {sidebarOpen ? "Hide VibeZ 🌀" : "Past VibeZ 🌀"}
              </button>
              <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Yo, spill your vibes! 🌈"
                  style={{ 
                    flex: 1, 
                    padding: "12px", 
                    borderRadius: "8px", 
                    border: "1px solid #555", 
                    background: "#333", // Dark input background
                    color: "#fff",
                    fontSize: "16px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <button type="submit" style={{ 
                  padding: "12px 20px", 
                  background: "#ff6f61", // Neon pink for Gen Z flair
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}>Send 🔥</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) { /* Tablet and below */
          div[style*='maxWidth: 1200px'] {
            maxWidth: 100%;
            padding: 10px;
          }
          div[style*='maxWidth: 600px'] {
            maxWidth: 90%;
          }
          div[style*='width: 250px'] {
            width: ${sidebarOpen ? "200px" : "0"}; /* Smaller sidebar on mobile */
          }
          div[style*='marginLeft: 260px'] {
            marginLeft: ${sidebarOpen ? "210px" : "0"}; /* Adjust margin for smaller sidebar */
          }
          h1[style*='fontSize: 2.5rem'] {
            fontSize: 1.8rem; /* Smaller heading on mobile */
          }
          input[style*='width: 70%'] {
            width: 60%; /* Smaller input on mobile */
          }
          button[style*='padding: 12px 20px'] {
            padding: 8px 16px; /* Smaller button on mobile */
          }
        }

        @media (max-width: 480px) { /* Mobile */
          div[style*='maxWidth: 600px'] {
            maxWidth: 100%;
          }
          div[style*='width: 250px'] {
            width: ${sidebarOpen ? "150px" : "0"}; /* Tiny sidebar on mobile */
          }
          div[style*='marginLeft: 260px'] {
            marginLeft: ${sidebarOpen ? "160px" : "0"}; /* Adjust margin for tiny sidebar */
          }
          h1[style*='fontSize: 2.5rem'] {
            fontSize: 1.5rem; /* Smaller heading on mobile */
          }
          input[style*='width: 70%'] {
            width: 50%; /* Smaller input on mobile */
          }
          button[style*='padding: 12px 20px'] {
            padding: 6px 12px; /* Smaller button on mobile */
          }
        }
      `}</style>
    </div>
  );
}
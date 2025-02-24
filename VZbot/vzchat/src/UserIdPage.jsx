import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserIdPage = () => {
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserID = localStorage.getItem("userID");
    if (savedUserID) {
      navigate("/app", { state: { userID: savedUserID } });
    }
  }, [navigate]);

  useEffect(() => {
    const canvas = document.getElementById("networkCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 80;

    let particles = [];

    // Create random particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const handleSubmit = async () => {
    if (userID.trim()) {
      const capitalizedUserID = userID.toUpperCase();

      try {
        const response = await axios.post(
          "http://localhost:5000/api/chatbot/login",
          { userID: capitalizedUserID }
        );

        if (response.status === 200) {
          const user = response.data.user; // Get the user object
          // alert(user.name);
          localStorage.setItem("userID", user.account_id); // Save to localStorage
          localStorage.setItem("userObject", JSON.stringify(user)); // Store entire user object

          navigate("/app", { state: { user } }); // Pass user object to next page
        } else {
          console.error("Login failed:", response.data);
        }
      } catch (error) {
        console.error(
          "Error during login:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.overlayText}>
          Connecting the People across the Globe
        </div>
      </div>
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome to Verizon</h2>

          {/* Network Animation Canvas */}
          <div style={styles.animationContainer}>
            <canvas id="networkCanvas"></canvas>
          </div>

          <p style={styles.subtitle}>Enter your User ID to continue</p>
          <input
            type="text"
            placeholder="Enter your ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
          />
          <button onClick={handleSubmit} style={styles.button}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
  },
  leftPanel: {
    width: "60%",
    background:
      "url('https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1280,h_800,dpr_1/https://assets.app.engoo.com/images/rGTEEA2fm66YMzeJz2UbwkKOW62bZVlqKOKZrXlMN7g.jpeg') no-repeat center center/cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  rightPanel: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F4F4F4",
  },
  card: {
    background: "#1A1A1A",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.2)",
    textAlign: "center",
    width: "320px",
    backdropFilter: "blur(8px)",
    height: "50vh",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "10px",
  },
  animationContainer: {
    width: "100%",
    height: "80px",
    overflow: "hidden",
  },
  subtitle: {
    fontSize: "14px",
    color: "#ddd",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ff0000",
    outline: "none",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    textAlign: "center",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  overlayText: {
    fontSize: "50px", // Larger for stronger impact
    fontWeight: "900", // Extra bold
    color: "#FFFFFF", // Pure white for high contrast
    textTransform: "uppercase", // Bold statement
    textAlign: "center",
    position: "absolute",
    width: "90%", // Slightly wider for balance
    top: "50%",
    transform: "translateY(-50%)", // Perfectly centered
    letterSpacing: "3px", // Modern spacing
    lineHeight: "1.2",
    textShadow: `
    0 0 10px rgba(255, 255, 255, 0.9),
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 40px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 0, 0, 0.5) // Adds slight red tint
  `, // Strong glow effect
    background: "rgba(0, 0, 0, 0.4)", // Semi-transparent black for contrast
    padding: "20px", // Gives breathing room
    borderRadius: "8px", // Soft rounded edges
  },
};

export default UserIdPage;

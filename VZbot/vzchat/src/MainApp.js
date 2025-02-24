import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import ChatPopUp from "./components/ChatPopUp";

const MainApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser =
      location.state?.user || JSON.parse(localStorage.getItem("userObject"));

    if (storedUser) {
      setUser(storedUser);
      localStorage.setItem("userObject", JSON.stringify(storedUser)); // Save to storage
    }
  }, [location]);

  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userID"); // Clear stored User ID
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="App">
      <div
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        {user ? (
          <ChatPopUp userID={user.account_id} user={user} />
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={handleLogout}
          style={{
            ...styles.logoutButton,
            ...(hover ? styles.logoutButtonHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  logoutButton: {
    position: "absolute",
    top: "58px",
    right: "80px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#000", // Black background
    color: "#fff", // White text
    border: "2px solid #fff", // White border
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
  },
  logoutButtonHover: {
    backgroundColor: "#fff", // White background on hover
    color: "#000", // Black text on hover
  },
};

export default MainApp;

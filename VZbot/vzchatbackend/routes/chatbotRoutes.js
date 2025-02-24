import express from "express";
import { handleMessage } from "../controllers/chatbotController.js"; // Import chatbot controller
import { handleLogin } from "../controllers/authController.js"; // Import login controller

const router = express.Router();

// Chatbot message route
router.post("/message", handleMessage);

// Login route for getting user ID
router.post("/login", handleLogin);

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatbotRoutes from "./routes/chatbotRoutes.js"; // ESM-style import

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Allow frontend communication

// Define API routes
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

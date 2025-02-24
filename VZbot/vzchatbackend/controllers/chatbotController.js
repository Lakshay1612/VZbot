import { getAIResponse } from "../services/llmService.js";

/**
 * Handles chatbot messages and sends them to the AI model.
 */
export async function handleMessage(req, res) {
  const { userId, message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  console.log(`📩 Received message from user (${userId}): ${message}`);

  // Send message to AI model
  const aiResponse = await getAIResponse(userId, message);

  // Send response to frontend
  res.json({ response: aiResponse });
}

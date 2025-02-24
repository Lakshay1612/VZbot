import axios from "axios";
import dotenv from "dotenv";
import { getChatHistory, storeMessage } from "./chatService.js"; // ✅ Import chat history service
import { extractIntent } from "../utils/extractIntent.js";

import { fetchDataForIntent } from "./intentService.js";
import { refineResponseWithData } from "../utils/refineResponseWithData.js";
dotenv.config();

const LLM_API_URL = process.env.LLM_API_URL;
const LLM_API_KEY = process.env.LLM_API_KEY;

/**
 * Sends a user message to the AI model with API key authentication.
 */
export async function getAIResponse(userId, userMessage) {
  try {
    if (!userMessage || userMessage.trim() === "") {
      return "Error: Empty message. Please type something.";
    }
    const intent = extractIntent(userMessage);
    // Retrieve last 5 messages for context
    const history = getChatHistory(userId);

    let conversationText = history
      .map((msg) => msg.text) // Only include message text
      .join("\n");

    // Append only the user message without any label
    conversationText += `\n${userMessage}`;
    console.log(conversationText);
    // API expects a **single object** inside `contents`

    const requestBody = {
      contents: [{ parts: [{ text: conversationText }] }],
    };

    // Call AI model with API key in headers
    const response = await axios.post(`${LLM_API_URL}`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": LLM_API_KEY, // ✅ Use API key in headers
      },
    });

    // const requestBody = {
    //   inputs: conversationText,
    //   parameters: {
    //     temperature: 0.7,
    //     max_new_tokens: 50, // Limits the response to 50 tokens (approx. words)
    //   },
    // };

    // const response = await axios.post(`${LLM_API_URL}`, requestBody, {
    //   headers: {
    //     Authorization: `Bearer ${LLM_API_KEY}`, // Use backticks for string interpolation
    //     "Content-Type": "application/json",
    //   },
    // });

    // Extract AI response
    const aiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that.";

    if (intent) {
      // ✅ Fetch data from JSON file based on intent
      const intentData = await fetchDataForIntent(intent);
      if (intentData) {
        // ✅ Send additional context to LLM for a refined response
        const finalResponse = await refineResponseWithData(
          userMessage,
          intentData
        );
        storeMessage(userId, "user", userMessage);
        storeMessage(userId, "bot", finalResponse);
        return finalResponse;
      }
    }
    // Store messages in history
    storeMessage(userId, "user", userMessage);
    storeMessage(userId, "bot", aiResponse);

    return aiResponse;
  } catch (error) {
    console.error(
      "❌ Error calling LLM API:",
      error.response?.data || error.message
    );
    return "Sorry, something went wrong.";
  }
}

// In-memory storage for chat history (Can be replaced with a DB)
const chatHistory = {}; // { userId: [ { role: "user"/"bot", text: "message" } ] }

/**
 * Stores user messages in memory (Limited to last 5 messages per user)
 * @param {string} userId - Unique identifier for the user
 * @param {string} role - "user" or "bot"
 * @param {string} text - The message content
 */
export function storeMessage(userId, role, text) {
  if (!chatHistory[userId]) {
    chatHistory[userId] = [];
  }

  chatHistory[userId].push({ role, text });

  // Keep only the last 5 messages
  if (chatHistory[userId].length > 3) {
    chatHistory[userId].shift(); // Remove the oldest message
  }
}

/**
 * Retrieves user chat history.
 * @param {string} userId - Unique identifier for the user
 * @returns {Array} - Array of previous messages (max 5)
 */
export function getChatHistory(userId) {
  return chatHistory[userId] || [];
}

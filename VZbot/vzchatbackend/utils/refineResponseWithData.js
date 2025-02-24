import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const LLM_API_URL = process.env.LLM_API_URL;
const LLM_API_KEY = process.env.LLM_API_KEY;
export async function refineResponseWithData(userMessage, intentData) {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            { text: `User: ${userMessage}` },
            {
              text: `This is the Data select from this: ${JSON.stringify(
                intentData
              )}`,
            }, // ✅ Provide JSON data
            {
              text: `Please generate a response taking help of the data given above.`,
            },
          ],
        },
      ],
    };

    const response = await axios.post(`${LLM_API_URL}`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": LLM_API_KEY,
      },
    });

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Unable to process request."
    );
  } catch (error) {
    console.error(
      "❌ Error refining response with JSON data:",
      error.response?.data || error.message
    );
    return "Error processing your request.";
  }
}

// import { initializeUser } from "../services/initializeUser.js";

// let globalUserID = null; // Global variable to store user ID

// export const handleLogin = (req, res) => {
//   const { userID } = req.body;

//   if (!userID) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   globalUserID = userID; // Store the user ID globally
//   console.log(globalUserID);
//   userData = initializeUser(globalUserID);
//   return res.status(200).json({ message: "Login successful", userData });
// };

// export const getGlobalUserID = () => globalUserID; // Function to retrieve it

import { initializeUser } from "../services/initializeUser.js";
import {
  initializeAppData,
  initializeUserData,
} from "../services/initializeVars.js";

let globalUserID = null; // Global variable to store user ID

export const handleLogin = async (req, res) => {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({ error: "User ID is required" });
  }

  globalUserID = userID; // Store user ID globally
  console.log("Global User ID:", globalUserID);

  try {
    // ✅ Wait for the user to be initialized before proceeding
    const userData = await initializeUser(globalUserID);
    initializeUserData();
    initializeAppData();

    return res.status(200).json({
      message: "Login successful",
      user: userData, // ✅ Return the initialized user object
    });
  } catch (error) {
    console.error("❌ Error initializing user:", error);
    return res.status(500).json({ error: "Failed to initialize user" });
  }
};

// ✅ Function to retrieve the global user ID
export const getGlobalUserID = (req, res) => {
  if (!globalUserID) {
    return res.status(404).json({ error: "No user ID found" });
  }
  return res.status(200).json({ userID: globalUserID });
};

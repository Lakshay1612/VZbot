// import fs from "fs";
// import path from "path";

// global.user = {}; // ✅ Global user object to store user details

// /**
//  * Initializes the global user object based on `userId`
//  * @param {string} userId - The ID of the user
//  */
// export function initializeUser(userId) {
//   try {
//     const filePath = path.resolve("data", "customers.json"); // ✅ User data file

//     // Read and parse JSON data
//     if (fs.existsSync(filePath)) {
//       const customers = JSON.parse(fs.readFileSync(filePath, "utf8"));

//       // Find user by ID
//       const userData = customers.find(
//         (customer) => customer.account_id === userId
//       );

//       if (userData) {
//         global.user = userData; // ✅ Assign user data to global variable
//         console.log(`👤 User initialized:`, global.user);
//         return userData;
//       } else {
//         console.warn(`⚠️ No user found for ID: ${userId}`);
//         global.user = { userId, name: "Guest" }; // Default user
//       }
//     } else {
//       console.warn(`⚠️ User data file not found.`);
//       global.user = { userId, name: "Guest" }; // Default user
//     }
//   } catch (error) {
//     console.error(`❌ Error initializing user:`, error);
//     global.user = { userId, name: "Guest" }; // Fail-safe
//   }
// }

import fs from "fs/promises"; // Use promise-based fs
import path from "path";

global.user = {}; // ✅ Global user object

/**
 * Initializes the global user object based on `userId`
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - The user object
 */
export async function initializeUser(userId) {
  try {
    const filePath = path.resolve("data", "customers.json"); // ✅ User data file

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (err) {
      console.warn(`⚠️ User data file not found.`);
      global.user = { userId, name: "Guest" }; // Default user
      return global.user;
    }

    // Read and parse JSON data
    const fileData = await fs.readFile(filePath, "utf8");
    const customers = JSON.parse(fileData);

    // Find user by ID
    const userData = customers.find(
      (customer) => customer.account_id === userId
    );

    if (userData) {
      global.user = userData; // ✅ Assign user data to global variable
      console.log(`👤 User initialized`);
      return global.user;
    } else {
      console.warn(`⚠️ No user found for ID: ${userId}`);
      global.user = { userId, name: "Guest" }; // Default user
      return global.user;
    }
  } catch (error) {
    console.error(`❌ Error initializing user:`, error);
    global.user = { userId, name: "Guest" }; // Fail-safe
    return global.user;
  }
}

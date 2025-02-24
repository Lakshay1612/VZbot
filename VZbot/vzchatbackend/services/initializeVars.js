import fs from "fs/promises"; // Async file operations
import path from "path";

// ✅ Global variable to store all plans, perks, and troubleshooting data
global.appData = {
  plans: [],
  perks: [],
  troubleshooting: [],
};

/**
 * Reads and parses JSON from a given file
 * @param {string} fileName - The JSON file name
 * @returns {Promise<Array>} - Parsed JSON data or an empty array if not found
 */
async function readJsonFile(fileName) {
  const filePath = path.resolve("data", fileName);
  try {
    await fs.access(filePath); // Check if file exists
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData); // Return parsed JSON
  } catch (err) {
    console.warn(`⚠️ Missing or unreadable file: ${fileName}`);
    return []; // Return empty array if file is missing
  }
}

/**
 * Initializes app-wide data (all plans, perks, troubleshooting data)
 * @returns {Promise<void>} - Updates `global.appData`
 */
export async function initializeAppData() {
  try {
    console.log("🔄 Loading global app data...");

    // Fetch all general data
    const [allPlans, allPerks, troubleshootingData] = await Promise.all([
      readJsonFile("plans.json"),
      readJsonFile("perks.json"),
      readJsonFile("troubleshooting.json"),
    ]);

    // ✅ Store data globally for quick access
    global.appData.plans = allPlans;
    global.appData.perks = allPerks;
    global.appData.troubleshooting = troubleshootingData;

    console.log(`✅ Global app data loaded successfully.`);
  } catch (error) {
    console.error(`❌ Error initializing app-wide data:`, error);
  }
}

/**
 * Initializes the user's related data (plans, perks, orders, usage, overUsages)
 * @returns {Promise<void>} - Updates `global.userData` with additional info
 */
export async function initializeUserData() {
  try {
    if (!global.user || !global.user.account_id) {
      console.warn(
        `⚠️ User is not initialized yet. Run initializeUser() first.`
      );
      return;
    }

    const accountId = global.user.account_id;

    // Fetch user-specific data
    const [plans, usage, overUsage, orders, perks] = await Promise.all([
      readJsonFile("plans.json"),
      readJsonFile("usage.json"),
      readJsonFile("overUsage.json"),
      readJsonFile("orders.json"),
      readJsonFile("perks.json"),
    ]);

    // Find relevant details using IDs from `global.user`
    const userPlan =
      plans.find((p) => p.plan_id === global.user.plan_id) || null;
    const userUsage =
      usage.find((u) => u.usage_id === global.user.usage_id) || null;
    const userOverUsage =
      overUsage.find((o) => o.overUsage_id === global.user.overage_id) || null;
    const userPerk =
      perks.find((p) => p.perk_id === global.user.perk_id) || null;
    const userOrders =
      orders.filter((order) => global.user.orders.includes(order.order_id)) ||
      [];

    // ✅ Update global.userData while keeping the user object intact
    global.userData = {
      ...global.user, // Keep user data
      plan: userPlan,
      usage: userUsage,
      overUsage: userOverUsage,
      perk: userPerk,
      orders: userOrders,
    };

    console.log(`📦 User Data Initialized:`);
  } catch (error) {
    console.error(`❌ Error initializing user data:`, error);
  }
}

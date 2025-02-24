import fs from "fs";
import path from "path";

/**
 * Fetches relevant data based on detected intents from `global.userData` or `global.appData`.
 * @param {Object} intentResult - Object containing detected intents and category.
 * @returns {Object} - Extracted data from `global.userData` or `global.appData`.
 */
export async function fetchDataForIntent(intentResult) {
  try {
    if (!global.userData || !global.userData.account_id) {
      console.warn(
        "⚠️ User data is not initialized. Run initializeUser() first."
      );
      return null;
    }

    if (
      !intentResult ||
      !Array.isArray(intentResult.intents) ||
      intentResult.intents.length === 0
    ) {
      console.warn("⚠️ No valid intents provided.");
      return null;
    }

    const { intents, category } = intentResult;
    let combinedData = {};

    for (const intent of intents) {
      switch (intent) {
        case "customers":
          combinedData.profile = global.user || null;
          break;
        case "plan":
          combinedData.plan = global.userData.plan || null;
          break;

        case "plans":
          combinedData.recommendations = {
            currentPlan: global.userData.plan || null,
            availablePlans: global.appData.plans || [],
            availablePerks: global.appData.perks || [],
            overUsage: global.userData.overUsage || null,
          };
          break;
        case "usage":
          combinedData.usage = global.userData.usage || null;
          break;
        case "overUsage":
          combinedData.overUsage = global.userData.overUsage || null;
          break;
        case "perk":
          combinedData.perk = global.userData.perk || null;
          break;

        case "perks":
          combinedData.recommendations = {
            currentPlan: global.userData.plan || null,
            availablePlans: global.appData.plans || [],
            availablePerks: global.appData.perks || [],
            overUsage: global.userData.overUsage || null,
          };
          break;
        case "orders":
          combinedData.orders = global.userData.orders || [];
          break;
        case "troubleshooting":
          combinedData.troubleshooting = global.appData.troubleshooting || [];
          break;
        case "recommendations":
          combinedData.recommendations = {
            currentPlan: global.userData.plan || null,
            availablePlans: global.appData.plans || [],
            availablePerks: global.appData.perks || [],
            overUsage: global.userData.overUsage || null,
          };
          break;
        default:
          console.warn(`⚠️ Unrecognized intent: ${intent}`);
      }
    }

    // Add category metadata for better response handling
    combinedData.category = category;

    return Object.keys(combinedData).length > 0 ? combinedData : null;
  } catch (error) {
    console.error(
      `❌ Error fetching data for intents: ${intentResult.intents}`,
      error
    );
    return null;
  }
}

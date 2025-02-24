// /**
//  * Dictionary of keywords mapped to specific intents.
//  */
// const intentDictionary = {
//   orders: ["order", "shipment", "tracking", "delivery", "order status"],
//   plans: ["plan", "subscription", "renewal", "pricing", "data pack"],
//   customers: ["profile", "account", "details", "email", "phone"],
//   usage: ["data usage", "call logs", "history", "activity"],
//   perks: ["benefits", "discounts", "loyalty", "offers"],
//   overage: ["extra charges", "fees", "billing", "penalty"],
//   troubleshooting: ["issue", "problem", "help", "support", "fix"],
// };

// /**
//  * Extracts all matching intents from AI response based on keyword matching.
//  */
// export function extractIntent(response) {
//   const matchedIntents = new Set(); // Use a Set to avoid duplicates

//   for (const [intent, keywords] of Object.entries(intentDictionary)) {
//     if (keywords.some((keyword) => response.toLowerCase().includes(keyword))) {
//       console.log(`🔍 Matched Intent: ${intent}`);
//       matchedIntents.add(intent);
//     }
//   }

//   return matchedIntents.size > 0 ? Array.from(matchedIntents) : null;
// }

/**
 * Dictionary of keywords mapped to specific intents.
 */
const intentDictionary = {
  orders: [
    "order",
    "shipment",
    "tracking",
    "delivery",
    "order status",
    "where is my order",
    "track my package",
    "shipping details",
    "estimated delivery",
    "delayed order",
    "courier",
    "dispatch",
    "expected arrival",
    "parcel",
  ],
  plan: [
    "my plan",
    "current plan",
    "which plan am I on",
    "my subscription",
    "my data pack",
    "plan details",
    "plan info",
    "what plan do I have",
    "monthly plan",
    "yearly plan",
    "plan validity",
  ],
  plans: [
    "plans",
    "subscription",
    "renewal",
    "pricing",
    "data pack",
    "change my plan",
    "best plan",
    "available plans",
    "upgrade plan",
    "downgrade plan",
    "plan comparison",
    "plan benefits",
    "plan cost",
    "plan offers",
  ],
  customers: [
    "name",
    "profile",
    "account",
    "details",
    "email",
    "phone",
    "update info",
    "change password",
    "edit profile",
    "account settings",
    "reset password",
    "modify details",
    "login issues",
    "profile update",
    "account verification",
  ],
  usage: [
    "data usage",
    "call logs",
    "history",
    "activity",
    "minutes used",
    "remaining data",
    "usage details",
    "internet usage",
    "SMS usage",
    "call records",
    "usage breakdown",
    "balance check",
  ],
  perk: [
    "my perks",
    "current perks",
    "my benefits",
    "what perks do I have",
    "my rewards",
    "my bonuses",
    "my credits",
    "exclusive perks",
    "reward status",
  ],
  perks: [
    "benefits",
    "discounts",
    "loyalty",
    "offers",
    "cashback",
    "reward points",
    "vouchers",
    "gift cards",
    "special deals",
    "membership perks",
    "promo codes",
    "limited-time offers",
  ],
  overUsage: [
    "extra charges",
    "fees",
    "billing",
    "penalty",
    "late fee",
    "overuse charges",
    "additional cost",
    "data overage",
    "unexpected charge",
    "roaming fees",
    "auto-renewal charges",
    "hidden fees",
    "overusage",
    "over usage",
  ],
  troubleshooting: [
    "issue",
    "problem",
    "help",
    "support",
    "fix",
    "not working",
    "network down",
    "connection issue",
    "slow internet",
    "no signal",
    "device issue",
    "service outage",
    "restart required",
    "troubleshoot",
  ],
  recommendations: [
    "recommend",
    "suggest",
    "best",
    "which",
    "should I",
    "help me choose",
    "what do you suggest",
    "top rated",
    "most popular",
    "ideal choice",
    "best fit",
    "personalized recommendation",
  ],
};

/**
 * Categorizes the extracted intent into a specific category (General, Troubleshooting, or Recommendation).
 * @param {string} response - The user input message.
 * @returns {Object} - Extracted intent(s) and detected category.
 */
export function extractIntent(response) {
  const matchedIntents = new Set(); // Use a Set to avoid duplicates
  let category = "general"; // Default category

  response = response.toLowerCase(); // Normalize input

  for (const [intent, keywords] of Object.entries(intentDictionary)) {
    if (keywords.some((keyword) => response.includes(keyword))) {
      console.log(`🔍 Matched Intent: ${intent}`);
      matchedIntents.add(intent);
    }
  }

  // Determine if the user is asking for troubleshooting help
  if (
    response.includes("not working") ||
    response.includes("fix") ||
    response.includes("issue") ||
    response.includes("problem") ||
    response.includes("troubleshoot") ||
    response.includes("error")
  ) {
    category = "troubleshooting";
  }

  // Determine if the user is looking for a recommendation
  if (
    response.includes("recommend") ||
    response.includes("suggest") ||
    response.includes("best") ||
    response.includes("which is better") ||
    response.includes("should I")
  ) {
    category = "recommendation";
  }

  return {
    intents: matchedIntents.size > 0 ? Array.from(matchedIntents) : null,
    category,
  };
}

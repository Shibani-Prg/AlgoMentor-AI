import "dotenv/config";

console.log("API Key exists:", !!process.env.GEMINI_API_KEY);

try {
  const response = await fetch(
    "https://generativelanguage.googleapis.com"
  );

  console.log("Status:", response.status);
  console.log("Gemini server reachable!");
} catch (error) {
  console.error("Network test failed:");
  console.error(error);
  console.error("Cause:", error.cause);
}

const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Parse incoming JSON
app.use(express.json());

const OPENAI_KEY = "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";
const PROJECT_ID = "proj_9LK6FxnYly2thPqjI2eIaqRp";

// Add GET test route
app.get("/", (req, res) => {
  res.send("✅ GPT Proxy is up and running.");
});

// Handle GPT POST calls
app.post("/", async (req, res) => {
  try {
    console.log("✅ Received body:", JSON.stringify(req.body, null, 2));

    if (!req.body || !req.body.model || !req.body.messages) {
      console.error("❌ Invalid body received:", req.body);
      return res.status(400).json({ error: "Invalid request body." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "OpenAI-Project": PROJECT_ID,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.text();
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

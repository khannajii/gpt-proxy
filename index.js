const express = require("express");
const fetch = require("node-fetch");
const app = express();

// ✅ This line is REQUIRED to parse incoming JSON
app.use(express.json());

const OPENAI_KEY = "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";
const PROJECT_ID = "proj_9LK6FxnYly2thPqjI2eIaqRp";

app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ GPT Proxy is up and running.");
});

app.post("/", async (req, res) => {
  try {
    console.log("🧠 Received raw body:", JSON.stringify(req.body));

    if (!req.body || !req.body.model || !req.body.messages) {
      return res.status(400).send("❌ Invalid JSON input");
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
    console.error("🚨 Error:", err);
    res.status(500).json({ error: err.toString() });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

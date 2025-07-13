const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const OPENAI_KEY = "sk-proj-YOUR-KEY"; // 🔁 replace this
const PROJECT_ID = "proj_XXXXXXXX";     // 🔁 replace this

app.post("/", async (req, res) => {
  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "OpenAI-Project": PROJECT_ID,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const result = await openaiRes.text();
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

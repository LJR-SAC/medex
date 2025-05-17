const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
  const messages = req.body.messages;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("OpenRouter error:", error);
    res.status(500).json({ error: "Error en OpenRouter" });
  }
});

module.exports = router;

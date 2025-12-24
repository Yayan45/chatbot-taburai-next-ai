export default async function handler(req, res) {
  try {
    if (!process.env.OPENROUTER_KEY) {
      return res.status(500).json({ error: "API key belum di-set di server" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        },
        body: JSON.stringify({
          model: req.body.model,
          messages: req.body.messages,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter ERROR:", data);
      return res.status(500).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}

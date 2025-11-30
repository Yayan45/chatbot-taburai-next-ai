export default async function handler(req, res) {
  try {
    if (!process.env.OPENROUTER_KEY)
      return res.status(500).json({ error: "API key belum di-set di server" });

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        },
        body: JSON.stringify({
          ...req.body,
          response_format: { type: "text" }, // 🔥 FIX BARU
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

  console.log(
    "API key terbaca:",
    process.env.OPENROUTER_KEY?.slice(0, 5) + "..."
  );
}

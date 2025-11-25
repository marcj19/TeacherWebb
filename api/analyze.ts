export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text, systemPrompt, model } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://teacher-webb.vercel.app",
        "X-Title": "Teacher Web"
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: `${systemPrompt}\n\nIMPORTANT: Return ONLY valid JSON.\n\nInput Text:\n${text}`
          }
        ]
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    console.error("OpenRouter API ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

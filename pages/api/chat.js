export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    let response;
    if (message.toLowerCase().includes("how are you")) {
      response = "Yo, I’m a bot, so no feelings, but I’m here for you, fam, 24/7 squad mode. 😎🔥";
    } else {
      response = "Bet, fam! That’s straight fire—here’s a vibe: no cap, I’m slaying this chat. 🤡💀";
    }
    res.status(200).json({ response });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
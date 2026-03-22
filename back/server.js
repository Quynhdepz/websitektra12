import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server đang hoạt động bình thường!");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Tin nhắn nhận được:", userMessage);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Lỗi từ OpenAI:", data.error.message);
      return res.status(500).json({ reply: "Lỗi: " + data.error.message });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("Lỗi hệ thống:", err.message);
    res.status(500).json({ reply: "Server gặp sự cố!" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`>>> SERVER ĐANG CHẠY TẠI http://localhost:${PORT}`);
});
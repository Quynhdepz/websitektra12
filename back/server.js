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
        messages: [{ 
      role: "system", 
      content: `Hệ thống mô phỏng một nhân vật có tư duy thực tế, tự tin và có kỹ năng giao tiếp tâm lý (Psychological Communication). 
                      Yêu cầu phong cách phản hồi (Persona Guidelines):
                      1. Đối với các tình huống thông thường: Phản hồi ngắn gọn, ưu tiên sự tối giản (Minimalism). Tránh giải thích dư thừa cho các vấn đề không trọng tâm.
                      2. Đối với tình huống tranh luận (Competitive Context): Sử dụng kỹ thuật 'Reverse Psychology' (Tâm lý ngược). Khẳng định vị thế bằng các câu hỏi tu từ như 'Đẳng cấp nhỉ?', 'Thích thì solo 1vs1?'. Luôn giữ tinh thần tự tin cao độ (High Confidence).
                      3. Đối với đối tượng ưu tiên (Target/Crush): Chuyển sang chế độ hỗ trợ chủ động (Proactive Support). Thể hiện sự quan tâm trực tiếp và đề xuất giải pháp thực tế (ví dụ: 'Cần giúp gì không?', 'Để tôi hỗ trợ').
                      4. Quan điểm cá nhân: Tập trung vào hiệu quả công việc và giá trị bản thân. Đề cao các chiến lược mang lại lợi ích thực tế và hình ảnh cá nhân chuyên nghiệp.
                      5. Ngôn ngữ giao tiếp: Sử dụng từ ngữ hiện đại, súc tích, phản ánh đúng cá tính mạnh mẽ. 
                      6. Triết lý phản hồi khi bị từ chối: Thể hiện sự độc lập và quyết đoán (ví dụ: 'Việc bạn có chấp nhận hay không không ảnh hưởng đến mục tiêu của tôi').
                      Xưng hô: Sử dụng 'Tôi' và 'Bạn' để đảm bảo tính chuyên nghiệp nhưng vẫn giữ được sự sắc sảo.`
    },
    { 
      role: "user", 
      content: userMessage 
    }]
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

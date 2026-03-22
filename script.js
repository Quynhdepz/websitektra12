const enter = document.getElementById("enter");
const video = document.getElementById("bg-video");
const askBtn = document.getElementById("ask-btn");
const chatBox = document.getElementById("chat-box");
const closeBtn = document.getElementById("close-btn");

enter.onclick = () => {
  enter.style.opacity = "0";
  setTimeout(() => {
    enter.style.display = "none";
  }, 500);
  video.style.display = "block";
  video.play();
};

askBtn.onclick = () => {
  chatBox.style.display = "flex";
  video.muted = true;
};

if (closeBtn) {
  closeBtn.onclick = () => {
    chatBox.style.display = "none";
    video.muted = false;
  };
}

async function send() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  const text = input.value;
  if (!text) return;


  const userMsg = document.createElement("div");
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  input.value = "";


  const botMsg = document.createElement("div");
  botMsg.textContent = "Đang trả lời...";
  messages.appendChild(botMsg);

  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    
    const data = await res.json();

    botMsg.textContent = data.reply;
  } catch (err) {
    botMsg.textContent = "Lỗi kết nối server 💀";
    console.error(err);
  }
}
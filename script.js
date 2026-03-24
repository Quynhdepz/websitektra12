const enter = document.getElementById("enter");
const video = document.getElementById("bg-video");
const chatBox = document.getElementById("chat-box");

enter.onclick = () => {
  enter.style.opacity = "0";
  setTimeout(() => {
    enter.style.display = "none";
  }, 500);
  video.style.display = "block";
  video.play();
};




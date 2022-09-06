import { io } from "socket.io-client";

// const io = socket('http://localhost:8080')
const socket = io("ws://localhost:8080", {
  auth: {
    token: "mytoken",
  },
});
// const io = socket('ws://localhost:8080/chat-connect');
socket.on("connect", () => {
  console.log(socket.id);
  console.log(socket.connected);
});

socket.on("disconnect", (reason) => {
  console.info(reason);
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

socket.on("connect_error", (err) => {
  console.error(err.message);
  socket.auth.token = "mytoken";
  socket.connect();
});

socket.emit("data", { name: "rahul" });
socket.on("response", (data) => {
  console.log(data);
  alert("server responded");
});

function Chat() {
  return (
    <div>
      <h1>Chat Window</h1>
    </div>
  );
}

export default Chat;

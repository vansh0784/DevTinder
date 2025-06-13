const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  // building the connections
  io.on("connection", (socket) => {
    // console.log("socket id", socket.id);
    // for these two peoples we create a room where they can talk .. so it is end to end connection for them
    socket.on("joinChat", ({ firstName, userId, connectionId }) => {
      const roomId = [userId, connectionId].sort().join("_");
      // console.log(firstName + " joined the room " + roomId);
      socket.join(roomId);
    });
    // sending the message
    socket.on("sendMessage", ({ firstName, text, userId, connectionId }) => {
      const roomId = [userId, connectionId].sort().join("_");
      // console.log(firstName + " " + text);
      io.to(roomId).emit("messageRecieved", { firstName, text });
    });
    // disconnecting the chat
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;

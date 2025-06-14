const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://devtinder-ui-theta.vercel.app",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, connectionId }) => {
      const roomId = [userId, connectionId].sort().join("_");
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, text, userId, connectionId }) => {
      const roomId = [userId, connectionId].sort().join("_");

      // Emit the userId of the sender to help frontend avoid duplicates
      io.to(roomId).emit("messageRecieved", { firstName, text, userId });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;

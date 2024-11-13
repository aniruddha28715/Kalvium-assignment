const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust to match your frontend
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for page-change event from a client
    socket.on("change-page", (newPage) => {
        console.log("Page change received:", newPage);

        // Broadcast the page change to all connected clients
        socket.broadcast.emit("page-change", newPage);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(5001, () => {
    console.log("Server is running on port 5001");
});

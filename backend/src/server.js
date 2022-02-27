import http from "http";
import SocketIO from "socket.io";
import express from "express";
const app = express();
// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");

// public 폴더를 유저에게 공개
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));
// app.get("/home", (_, res) => {
//   res.send("hi");
// });
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "*",
  },
});

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  Object.keys(rooms).map((key) => {
    if (sids[key] === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms[roomName]?.length;
}

wsServer.on("connection", (socket) => {
  console.log("connection");
  socket["nickname"] = "Anon";
  // socket.onAny((event) => {
  //   console.log(`Socket Event: ${event}`);
  // });
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    wsServer.sockets.emit("room_change", publicRooms());
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });

  // 브라우저 간 candidate을 왔다갔다 하면서 공유
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
  socket.on("left_room", (roomName, user) => {
    socket.leave(roomName);
  });
  socket.on("new_message", (msg, room, user, done) => {
    // socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    socket.to(room).emit("new_message", msg, user);
    done();
  });

  socket.on("disconnecting", () => {
    Object.keys(socket.rooms).map((room) => {
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
    });
  });

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });
});

const port = 3002;
const handleListen = () => console.log(`Listening on http://localhost:${port}`);
httpServer.listen(port, handleListen);

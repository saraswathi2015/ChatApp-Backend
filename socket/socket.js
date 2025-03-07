import express from "express";
import { Server } from "socket.io";
import http from "http";
import { getUserDetailsFromToken } from "../helpers/getUserDetailsFromToken.js";
import UserModel from "../models/userModel.js";
import ConversationModel from "../models/conversationModel.js";

const app = express();

/***socket connection */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

//socket running at http://localhost:8000

//online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connected user", socket.id);

  const token = socket.handshake.auth.token;
  // console.log("socket token", token);

  //current user details
  const user = await getUserDetailsFromToken(token);
  // console.log("socket use", user);

  //create a room for specific user
  socket.join(user?._id);
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    console.log("userId", userId);
    const userDetails = await UserModel.findById(userId).select("-password");

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      profile_pic: userDetails?.profile_pic,
      online: onlineUser.has(userId),
    };

    socket.emit("message-user", payload);
  });

  //new message
  socket.on("new message", async (data) => {
    console.log("data", data);

    // sender= data?.sender,
    // receiver= data?.receiver,

    //check conversation is available both user in database
    // let  conversation  = await ConversationModel.findOne({sender
    // // $or: [
    //   {
    //     sender: data?.sender,
    //     receiver: data?.receiver,
    //   },
    //   {
    //     sender: data?.receiver,
    //     receiver: data?.sender,
    //   },
    // ],
    // });
    // return conversation;
    // console.log("conversation", conversation);

    //if conversation is not available
    // if (!conversation) {
    const createConversation = await ConversationModel({
      sender: data?.sender,
      receiver: data?.receiver,
    });
    return (conversation = await createConversation.save());
    // }

    console.log("new message", data);
    console.log("conversation", conversation);
  });

  //user disconnected
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("disconnect user", socket.id);
  });
});

export { app, server };

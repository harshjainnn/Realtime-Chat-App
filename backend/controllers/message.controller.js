import User from "../models/users.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { getRecieverSocketId, io } from "../lib/socket.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInId } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Couldnt fetch Users for side bar: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const messageLoader = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in Loading Message: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: senderId,
      recieverId: recieverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();

    //socket.io functionality
    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in Sending Message: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

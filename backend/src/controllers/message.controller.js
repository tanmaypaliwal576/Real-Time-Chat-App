import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedinUserId = req.user._id;
    const fileteredUsers = await User.find({
      _id: { $ne: loggedinUserId },
    }).select("-password");

    res.status(200).json(fileteredUsers);
  } catch (error) {
    console.log("Error in message controller", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myid = req.user._id;
    const { id: usertochat } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myid, receiverId: usertochat },

        { senderId: usertochat, receiverId: myid },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getmessage controller", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image)
      return res.status(400).json({ message: "TEXT OR IMAGE IS REQUIRED" });

    if (senderId.equals(receiverId))
      return res
        .status(400)
        .json({ message: "CANNOT SEND MESSAGE TO YOURSELF" });

    const receiverexits = await User.findById(receiverId);
    if (!receiverexits)
      return res.status(400).json({ message: "USER DOES NOT EXIST" });

    let imageUrl;
    if (image) {
      const uploadresponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadresponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);

    //todo (real time )
  } catch (error) {
    console.log("Error in sendmessage controller", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedinUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myid, receiverId: usertochat },

        { senderId: usertochat, receiverId: myid },
      ],
    });

    const chatPartnersIds = [
      ...new Set(
        messages.map((message) => {
          if (message.senderId.toString() !== loggedinUserId.toString()) {
            return message.senderId.toString();
          } else {
            return message.receiverId.toString();
          }
        })
      ),
    ];

    const ChatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");

    res.status(200).json(ChatPartners);
  } catch (error) {
    console.log("Error in getChatPartners controller", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

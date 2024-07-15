const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const [reciverID, senderID] = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [reciverID, senderID] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = new chatModel({
      members: [reciverID, senderID],
    });

    const response = await newChat.save();

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const findUserChat = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chat = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const findChat = async (req, res) => {
  const { reciverID, senderID } = req.params;

  try {
    const chat = await chatModel.find({
      members: { $all: [reciverID, senderID] },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {createChat, findChat, findUserChat};
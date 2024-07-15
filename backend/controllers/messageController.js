const messageModel = require("../models/messageModel");

const createMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  const text = new messageModel({
    chatId: chatId,
    senderId: senderId,
    message: message,
  });

  try {
    const response = await text.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const message = await messageModel.findOne({ chatId: chatId });
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { createMessage, getMessage };

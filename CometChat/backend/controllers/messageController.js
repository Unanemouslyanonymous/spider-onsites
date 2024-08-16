import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { content, recipientId, groupId } = req.body;
    let message;

    if (groupId) {
      message = new Message({
        sender: req.user.userId,
        content,
        group: groupId,
      });
    } else if (recipientId) {
      message = new Message({
        sender: req.user.userId,
        content,
        recipient: recipientId,
      });
    }

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({
      $or: [
        { group: conversationId },
        { recipient: conversationId, sender: req.user.userId },
        { sender: conversationId, recipient: req.user.userId },
      ],
    })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

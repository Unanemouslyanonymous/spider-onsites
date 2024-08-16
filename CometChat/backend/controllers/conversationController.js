import Group from '../models/Group.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all group conversations the user is part of
    const groups = await Group.find({ members: userId }).populate('members', 'username');

    // Find all individual conversations the user has had
    const users = await User.findById(userId).select('_id username');
    const individualConversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ['$sender', userId] }, '$recipient', '$sender'],
          },
          lastMessage: { $last: '$$ROOT' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: '$user._id',
          name: '$user.username',
        },
      },
    ]);

    const conversations = [
      ...groups.map((group) => ({
        _id: group._id,
        name: group.name,
        type: 'group',
        members: group.members,
      })),
      ...individualConversations.map((conversation) => ({
        _id: conversation._id,
        name: conversation.name,
        type: 'user',
      })),
    ];

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

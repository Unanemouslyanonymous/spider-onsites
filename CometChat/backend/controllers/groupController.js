import Group from '../models/Group.js';

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const group = new Group({ name, members: [...members, req.user.userId] });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.userId }).populate('members', 'username');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members', 'username');
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
};

import Message from '../models/Message.js';

// Get all active messages
export const getMessages = async (req, res) => {
  try {
    const { type, theme } = req.query;
    const query = { active: true };
    
    if (type) query.type = type;
    if (theme) query.theme = theme;

    const messages = await Message.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


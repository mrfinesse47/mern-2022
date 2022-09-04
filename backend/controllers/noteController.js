const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get notes per ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  // the req.user.id comes from middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketID);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

module.exports = {
  getNotes,
};

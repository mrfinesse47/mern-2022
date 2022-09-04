const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

//re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:ticketID/notes', noteRouter);

const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;

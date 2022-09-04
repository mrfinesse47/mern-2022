import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Ticket = () => {
  console.log('ticket renders');
  const { isError, message } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  return <div>Ticket</div>;
};

export default Ticket;

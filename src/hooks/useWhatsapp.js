import { useContext } from 'react';
import { WhatsappContext } from '../contexts/WhatsappContext';

const useWhatsapp = () => useContext(WhatsappContext);

export default useWhatsapp;
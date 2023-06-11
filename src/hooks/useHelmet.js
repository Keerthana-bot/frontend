import { useContext } from 'react';
import { HelmetContext } from '../contexts/HelmetContext';

const useHelmet = () => useContext(HelmetContext);

export default useHelmet;
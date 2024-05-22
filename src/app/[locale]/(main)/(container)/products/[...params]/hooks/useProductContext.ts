'use client';

import { useContext } from 'react';
import { productContext } from '../contexts/productContext';

export const useProductContext = () => useContext(productContext);

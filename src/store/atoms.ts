import { CartContentFragment } from '@/graphql/types/graphql';
import { atom } from 'jotai';

export interface ICartAtom extends CartContentFragment {}
export const cartAtom = atom<ICartAtom | null>(null);

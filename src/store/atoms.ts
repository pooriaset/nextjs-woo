import { CartContentFragment } from '@/graphql/types/graphql';
import { atom } from 'jotai';

export interface ICartAtom extends CartContentFragment {
  productsCount: number;
}
export const cartAtom = atom<ICartAtom | null>(null);

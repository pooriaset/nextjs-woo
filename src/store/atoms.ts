import { CartContentFragment } from '@/graphql/types/graphql';
import { atomWithReset } from 'jotai/utils';

export interface ICartAtom extends CartContentFragment {}
export const cartAtom = atomWithReset<ICartAtom | null>(null);

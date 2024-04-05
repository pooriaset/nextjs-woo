import { createContext } from 'react';

export interface IAppContext {
  isMobile: null | boolean;
}
export const appContext = createContext<IAppContext>({
  isMobile: null,
});

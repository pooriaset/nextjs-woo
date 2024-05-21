import BaseLayout from '@/components/BaseLayout/BaseLayout';
import { FC, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default Layout;

'use client';

import { DesktopFooter, MobileFooter } from './components';
import { Box } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { FC } from 'react';
import { IPageListItem } from '@/app/[locale]/(main)/layout';

export interface FooterProps {
  pages: IPageListItem[];
}
const Footer: FC<FooterProps> = ({ pages }) => {
  const { isMobile } = useAppContext();

  return (
    <Box mt={2}>
      {isMobile ? <MobileFooter /> : <DesktopFooter pages={pages} />}
    </Box>
  );
};

export default Footer;

'use client';

import { Z_INDEX_VALUES } from '@/config/responsive';
import { AppBar } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface HeaderProps {
  children: ReactNode;
}
const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <AppBar
      elevation={0}
      position="static"
      color="inherit"
      sx={{
        borderBottom: '2px solid',
        borderColor: (theme) => theme.palette.divider,
        position: 'sticky',
        top: 0,
        zIndex: Z_INDEX_VALUES.siteHeader,
      }}
    >
      {children}
    </AppBar>
  );
};

export default Header;

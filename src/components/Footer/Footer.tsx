import { IPageListItem } from '@/app/[locale]/(main)/layout';
import { Box } from '@mui/material';
import { FC } from 'react';
import DesktopView from '../App/DesktopView';
import MobileView from '../App/MobileView';
import { DesktopFooter, MobileFooter } from './components';

export interface FooterProps {
  pages: IPageListItem[];
}
const Footer: FC<FooterProps> = ({ pages }) => {
  return (
    <Box mt={2}>
      <MobileView>
        <MobileFooter />
      </MobileView>
      <DesktopView>
        <DesktopFooter pages={pages} />
      </DesktopView>
    </Box>
  );
};

export default Footer;

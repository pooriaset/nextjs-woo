import {
  MOBILE_BUY_BOX_HEIGHT,
  MOBILE_FOOTER_HEIGHT,
} from '@/config/responsive';
import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface MobileBuyBoxProps {}
const MobileBuyBox: FC<PropsWithChildren<MobileBuyBoxProps>> = ({
  children,
}) => {
  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: MOBILE_FOOTER_HEIGHT,
        left: 0,
        right: 0,
        height: MOBILE_BUY_BOX_HEIGHT,
        backgroundColor: (theme) => theme.palette.background.default,
        boxShadow: (theme) => theme.shadows[2],
        px: 3,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction="row"
        spacing={1}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default MobileBuyBox;

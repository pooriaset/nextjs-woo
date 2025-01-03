import { SvgIconComponent } from '@mui/icons-material';
import { CardHeader as MuiCardHeader, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface CardHeaderProps {
  title: string;
  icon: SvgIconComponent;
}
const CardHeader: FC<CardHeaderProps> = (props) => {
  return (
    <MuiCardHeader
      title={
        <Stack direction="row" spacing={1} alignItems="center">
          <props.icon />
          <Typography variant="h6">{props.title}</Typography>
        </Stack>
      }
      titleTypographyProps={{
        component: 'div',
      }}
    />
  );
};

export default CardHeader;

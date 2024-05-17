import { Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface SectionProps {
  label: string;
}

const Section: FC<PropsWithChildren<SectionProps>> = ({ label, children }) => {
  return (
    <Stack spacing={1}>
      <Typography
        component="h3"
        variant="h5"
        sx={{
          scrollMarginTop: 1000,
          fontWeight: 500,
          lineHeight: 2,
          display: 'inline',
          width: 'fit-content',
          borderBottom: 3,
          borderColor: (theme) => theme.palette.primary.light,
        }}
      >
        {label}
      </Typography>

      {children}
    </Stack>
  );
};

export default Section;

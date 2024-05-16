import { Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface SectionProps {
  id: string;
  label: string;
  onChange: (id: string) => void;
}
const Section: FC<PropsWithChildren<SectionProps>> = ({
  id,
  label,
  children,
  onChange,
}) => {
  return (
    <Stack spacing={1} id={id}>
      <Typography
        component="h3"
        variant="h5"
        sx={{
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

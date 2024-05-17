import { Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { InView } from 'react-intersection-observer';

export interface SectionProps {
  id: string;
  label: string;
  onChangeIntersection: (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) => void;
}
const Section: FC<PropsWithChildren<SectionProps>> = ({
  label,
  children,
  id,
  onChangeIntersection,
}) => {
  return (
    <Stack spacing={1}>
      <InView threshold={0.5} as="div" id={id} onChange={onChangeIntersection}>
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
      </InView>

      {children}
    </Stack>
  );
};

export default Section;

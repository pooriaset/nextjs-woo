'use client';

import { Link } from '@/navigation';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

export interface SlidersHeaderProps {
  title: string;
  buttonTitle?: string;
  moreLink?: string;
}
const SlidersHeader: FC<SlidersHeaderProps> = ({
  title,
  buttonTitle,
  moreLink,
}) => {
  const t = useTranslations();

  return (
    <Stack direction="row" justifyContent="space-between" px={1.5}>
      <Typography variant="h6">{title}</Typography>
      {moreLink && (
        <Button
          LinkComponent={Link}
          href={moreLink}
          variant="text"
          color="primary"
          endIcon={
            <ChevronLeft
              sx={{
                transform: (theme) =>
                  theme.direction === 'rtl' ? 'translate(180deg)' : undefined,
              }}
            />
          }
        >
          {buttonTitle || t('buttons.viewMore')}
        </Button>
      )}
    </Stack>
  );
};

export default SlidersHeader;

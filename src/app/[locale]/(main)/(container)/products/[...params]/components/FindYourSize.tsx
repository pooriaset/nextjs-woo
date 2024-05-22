'use client';

import Dialog from '@/components/Dialog';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const FindYourSize = () => {
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const title = t('buttons.findYourSize');

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          height: '100%',
          minWidth: 'fit-content',
        }}
        onClick={onToggle}
      >
        {title}
      </Button>
      <Dialog
        title={title}
        open={open}
        onClose={onToggle}
        PaperProps={{
          sx: {
            width: 600,
          },
        }}
      >
        <ul>
          <li>
            در نظر داشته باشید محدوده ی خطای اندازه گیری بین 1 تا 2 سانتیمتر
            نرمال است.
          </li>
          <li>اعداد بر حسب سانتی‌متر می باشد.</li>
        </ul>
      </Dialog>
    </>
  );
};

export default FindYourSize;

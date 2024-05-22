'use client';

import { ConfirmProvider } from 'material-ui-confirm';
import { useTranslations } from 'next-intl';
import React, { FC, PropsWithChildren } from 'react';

const ConfirmAlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();
  return (
    <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: {
          variant: 'contained',
          color: 'error',
        },
        cancellationButtonProps: {
          variant: 'outlined',
          color: 'primary',
        },
        cancellationText: t('buttons.return'),
        confirmationText: t('buttons.yes'),

        contentProps: {
          dividers: true,
        },
        title: t('confirmAlert.title'),
      }}
    >
      {children}
    </ConfirmProvider>
  );
};

export default ConfirmAlertProvider;

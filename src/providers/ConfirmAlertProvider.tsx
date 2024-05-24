'use client';

import { ConfirmProvider, ConfirmProviderProps } from 'material-ui-confirm';
import { useTranslations } from 'next-intl';
import React, { FC, PropsWithChildren, memo, useMemo } from 'react';

const ConfirmAlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();

  const defaultOptions = useMemo(() => {
    const defaultOptions: ConfirmProviderProps['defaultOptions'] = {
      confirmationButtonProps: {
        variant: 'contained',
        color: 'primary',
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
    };
    return defaultOptions;
  }, [t]);

  return (
    <ConfirmProvider defaultOptions={defaultOptions}>
      {children}
    </ConfirmProvider>
  );
};

export default memo(ConfirmAlertProvider);

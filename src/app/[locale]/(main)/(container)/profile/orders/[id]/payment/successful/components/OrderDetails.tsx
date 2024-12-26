'use client';

import { Link } from '@/navigation';
import { ContentCopyOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import toast from 'react-hot-toast';
import CheckedAnimation from './CheckedAnimation';

export interface OrderDetailsProps {
  orderId: number | string;
  transactionId: number | string;
}

const OrderDetails: FC<OrderDetailsProps> = ({ orderId, transactionId }) => {
  const t = useTranslations();

  const handleClickOnCopy = () => {
    navigator.clipboard
      .writeText(transactionId.toString())
      .then(() => {
        toast.success(t('messages.copied'));
      })
      .catch((err) => {});
  };

  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{
        textAlign: 'center',
      }}
    >
      <CheckedAnimation />
      <Typography variant="h5" gutterBottom>
        {t('order.payment.successful.title')}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {t('order.payment.successful.description')}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {t('order.payment.successful.transactionId')}{' '}
        </Typography>
        <Button
          onClick={handleClickOnCopy}
          variant="outlined"
          endIcon={<ContentCopyOutlined fontSize="small" />}
        >
          <Typography variant="h6">{transactionId}</Typography>
        </Button>
      </Stack>
      <Button
        sx={{
          width: 'fit-content',
        }}
        LinkComponent={Link}
        href={`/profile/orders/${orderId}`}
        variant="contained"
        color="primary"
        size="large"
      >
        {t('order.view')}
      </Button>
    </Stack>
  );
};

export default OrderDetails;

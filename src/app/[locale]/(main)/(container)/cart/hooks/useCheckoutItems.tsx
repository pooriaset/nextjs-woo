'use client';

import PriceLabel from '@/components/common/PriceLabel';
import { CartContentFragment } from '@/graphql/types/graphql';
import { extractNumbers } from '@/utils/price';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const useCheckoutItems = ({ content }: { content: CartContentFragment }) => {
  const t = useTranslations();

  const fees =
    content.fees?.map((fee) => {
      return {
        type: 'row',
        key: (
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            {fee?.name}
          </Typography>
        ),
        value: (
          <PriceLabel
            value={Math.abs(fee?.total!)}
            TypographyProps={{
              fontWeight: 600,
              color: 'error',
            }}
          />
        ),
      };
    }) || [];

  const coupons =
    content.appliedCoupons?.map((coupon) => {
      return {
        type: 'row',
        key: (
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            {t('fields.discountCode')}
          </Typography>
        ),
        value: (
          <PriceLabel
            value={coupon?.discountAmount}
            TypographyProps={{
              fontWeight: 600,
              color: 'error',
            }}
          />
        ),
      };
    }) || [];

  const totalProfit =
    +(content?.discountTotal || 0) + Math.abs(+(content?.feeTotal || 0));

  const items = [
    {
      type: 'row',
      key: (
        <Typography variant="body2" color="gray" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.subTotal')} ({content.contents?.itemCount})
        </Typography>
      ),
      value: (
        <PriceLabel
          value={content.subtotal}
          TypographyProps={{
            fontWeight: 600,
            color: 'gray',
          }}
        />
      ),
    },
    {
      type: 'row',
      key: (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.shippingCost')}
        </Typography>
      ),
      value: (
        <PriceLabel
          value={content.shippingTotal}
          TypographyProps={{
            fontWeight: 600,
          }}
        />
      ),
    },
    ...fees,
    ...coupons,
    {
      type: 'divider',
    },
    {
      key: (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.total')}
        </Typography>
      ),
      value: (
        <PriceLabel
          value={content.total}
          TypographyProps={{
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      key: (
        <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.yourProfit')}
        </Typography>
      ),
      value: (
        <PriceLabel
          value={totalProfit}
          TypographyProps={{
            fontWeight: 600,
            color: 'error',
          }}
        />
      ),
    },
  ];

  return items;
};

export default useCheckoutItems;

'use client';

import { useAppContext } from '@/hooks/useAppContext';
import {
  AccountBalanceWalletOutlined,
  LocalShippingOutlined,
} from '@mui/icons-material';
import { Box, Button, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslations } from 'next-intl';
import DiscountPercentage from '../../../../../../../components/common/DiscountPercentage';
import OldPrice from '../../../../../../../components/common/OldPrice';
import PriceLabel from '../../../../../../../components/common/PriceLabel';
import { FC } from 'react';
import {
  extractNumbers,
  getMinOfRangePrice,
  getProfitPercentage,
} from '@/utils/price';
import { Variations } from '@/app/[locale]/(main)/(container)/products/types/common';
import { useProductContext } from '@/app/[locale]/(main)/(container)/products/[...id]/hooks/useProductContext';

const listItems = [
  {
    text: 'ارسال از دو روز کاری دیگر',
    icon: <LocalShippingOutlined />,
  },
  {
    text: '5% بازگشت به اعتبار',
    icon: <AccountBalanceWalletOutlined />,
  },
];

export interface BuyBoxProps {
  variations: Variations;
}

const BuyBox: FC<BuyBoxProps> = ({ variations }) => {
  const { isMobile } = useAppContext();
  const t = useTranslations();

  const { selectedVariantId } = useProductContext();

  const variant = variations?.nodes.find(
    (item) => item.id === selectedVariantId,
  );

  const profitMarginPercentage = getProfitPercentage(
    extractNumbers(getMinOfRangePrice(variant?.price)),
    extractNumbers(variant?.regularPrice),
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
      }}
    >
      <List>
        {listItems.map((item) => {
          return (
            <>
              <ListItem
                disablePadding
                sx={{
                  py: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 1,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: (theme) => theme.typography.caption.fontSize,
                  }}
                />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
          }}
        >
          {variant?.price !== variant?.regularPrice && (
            <>
              <OldPrice
                value={variant?.regularPrice}
                TypographyProps={{
                  variant: 'body1',
                }}
              />

              <DiscountPercentage value={profitMarginPercentage} />
            </>
          )}
        </Box>
        <PriceLabel
          TypographyProps={{
            variant: 'h6',
            fontWeight: 600,
          }}
          value={variant?.salePrice}
        />
      </Box>
      <Box>
        <Button fullWidth variant="contained" color="error" size="large">
          {t('buttons.addToCart')}
        </Button>
      </Box>
    </Box>
  );
};

export default BuyBox;

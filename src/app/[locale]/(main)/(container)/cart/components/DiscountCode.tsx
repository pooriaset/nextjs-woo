import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { APPLY_COUPON_MUTATION, GET_CART_QUERY } from '@/graphql/queries/cart';
import { ApplyCouponMutation } from '@/graphql/types/graphql';
import { useApolloClient, useMutation } from '@apollo/client';
import { DiscountOutlined, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

interface DiscountCodeProps {}

const DiscountCode: FC<DiscountCodeProps> = () => {
  const t = useTranslations();
  const [codeName, setCodeName] = useState<string | null>(null);

  const client = useApolloClient();

  const [applyCoupon, { loading }] = useMutation<ApplyCouponMutation>(
    APPLY_COUPON_MUTATION,
  );

  const onSubmit = async (event: any) => {
    event.preventDefault();
    await applyCoupon({
      variables: {
        code: codeName,
      },
    });
    await client.refetchQueries({ include: [GET_CART_QUERY] });
    setCodeName(null);
  };

  return (
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <DiscountOutlined fontSize="small" />
          <Typography>{t('discounts.discountCodeTitle')}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={1} direction="row" component="form" onSubmit={onSubmit}>
          <TextField
            size="small"
            variant="outlined"
            label={t('fields.discountCode')}
            value={codeName}
            onChange={(e) => setCodeName(digitsFaToEn(e.target.value))}
            fullWidth
          />

          <ButtonWithLoading
            isLoading={loading}
            type="submit"
            variant="outlined"
            sx={{
              minWidth: 60,
              width: 60,
            }}
          >
            اعمال
          </ButtonWithLoading>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default DiscountCode;

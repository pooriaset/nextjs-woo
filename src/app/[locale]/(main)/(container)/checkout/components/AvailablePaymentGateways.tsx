import { GetPaymentGatewaysQuery } from '@/graphql/types/graphql';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import MethodItem from './MethodItem';

export interface AvailablePaymentGatewaysProps {
  value: string;
  onChange: (string: string) => void;
  items: GetPaymentGatewaysQuery | undefined;
}
const AvailablePaymentGateways: FC<AvailablePaymentGatewaysProps> = ({
  value,
  onChange,
  items,
}) => {
  const t = useTranslations();

  return (
    <Card variant="outlined">
      <CardHeader
        title={t('pages.checkout.paymentGateway')}
        titleTypographyProps={{
          variant: 'h6',
        }}
      />
      <CardContent>
        <Grid container spacing={2}>
          {items?.paymentGateways?.nodes.map((gateway) => {
            const selected = gateway.id === value;

            const src = gateway.icon || '';

            return (
              <Grid item key={gateway.id}>
                <MethodItem
                  selected={selected}
                  onClick={() => onChange(gateway.id)}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    height={40}
                  >
                    <Radio disableRipple checked={selected} size="small" />

                    <img src={src} alt="Gateway" />

                    <Typography variant="body2">{gateway.title}</Typography>
                  </Stack>
                </MethodItem>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvailablePaymentGateways;

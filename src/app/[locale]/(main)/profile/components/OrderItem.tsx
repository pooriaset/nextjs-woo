import DotIcon from '@/components/Icons/components/Use/DotIcon';
import PriceLabel from '@/components/common/PriceLabel';
import {
  GetCustomerOrdersQuery,
  OrderStatusEnum,
} from '@/graphql/types/graphql';
import useLocaleDate from '@/hooks/useLocaleDate';
import useOrderStatusMapper from '@/hooks/useOrderStatusMapper';
import { Link } from '@/navigation';
import { ChevronLeft } from '@mui/icons-material';
import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import OrderItemImage from './OrderItemImage';

export type OrderItemProps = Nullable<{
  total: string;
  subtotal: string;
  status: OrderStatusEnum;
  date: string;
  id: number;
  lineItems: NonNullable<
    NonNullable<GetCustomerOrdersQuery['customer']>['orders']
  >['edges'][number]['node']['lineItems'];
}>;

const OrderItem: FC<OrderItemProps> = (props) => {
  const { date, id, status, total, lineItems } = props;

  const mapper = useOrderStatusMapper();

  const properties = mapper[status!];

  const theme = useTheme();

  const t = useTranslations();

  const images =
    lineItems!.nodes.map((node: any) => {
      return node.product?.node?.image;
    }) || [];

  const localDate = useLocaleDate(date);

  return (
    <Card
      variant="outlined"
      component={Link}
      href={`/profile/orders/${id}`}
      sx={{ display: 'block' }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="end"
          >
            <Stack
              alignItems="end"
              direction="row"
              spacing={0.5}
              sx={{
                color: properties.color,
              }}
            >
              <properties.icon />

              <Typography variant="body2" color="text.primary" fontWeight={600}>
                {properties.label}
              </Typography>
            </Stack>

            <Tooltip title={t('order.view')}>
              <ChevronLeft
                sx={{
                  transform: (theme) =>
                    theme.direction === 'ltr' ? 'rotate(180deg)' : undefined,
                }}
              />
            </Tooltip>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="body2" color="text.secondary">
              {t('fields.date')}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {localDate}
            </Typography>
            <DotIcon color={theme.palette.divider} />
            <Typography variant="body2" color="text.secondary">
              {t('fields.orderId')}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {id}
            </Typography>
            <DotIcon color={theme.palette.divider} />
            <Typography variant="body2" color="text.secondary">
              {t('fields.amount')}
            </Typography>
            <PriceLabel value={total} />
          </Stack>
          <Stack direction="row" spacing={1}>
            {images.map((image) => {
              return <OrderItemImage key={image.id} src={image.sourceUrl} />;
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderItem;

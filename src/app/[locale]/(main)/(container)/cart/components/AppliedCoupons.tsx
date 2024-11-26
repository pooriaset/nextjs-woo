import PriceLabel from '@/components/common/PriceLabel';
import {
  GET_CART_QUERY,
  REMOVE_COUPONS_MUTATION,
} from '@/graphql/queries/cart';
import { RemoveCouponsMutation } from '@/graphql/types/graphql';
import { useApolloClient, useMutation } from '@apollo/client';
import { Delete } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FC } from 'react';

export interface AppliedCouponsProps {
  items: any;
}
const AppliedCoupons: FC<AppliedCouponsProps> = ({ items }) => {
  const [removeCoupons, { loading }] = useMutation<RemoveCouponsMutation>(
    REMOVE_COUPONS_MUTATION,
  );
  const client = useApolloClient();
  const onClick = async (code: string) => {
    await removeCoupons({
      variables: {
        codes: [code],
      },
    });
    await client.refetchQueries({ include: [GET_CART_QUERY] });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <List dense>
          {items?.map((item: any) => {
            return (
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => onClick(item.code)}
                    size="small"
                    edge="end"
                    aria-label="delete"
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.code}
                  secondary={<PriceLabel value={item.discountAmount} />}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default AppliedCoupons;

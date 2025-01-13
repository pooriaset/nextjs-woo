'use client';

import CustomSkeleton from '@/components/CustomSkeleton/CustomSkeleton';
import UserFields from '@/components/UserFields/UserFields';
import useUserFields, {
  type UserFieldNames,
} from '@/components/UserFields/hooks/useUserFields';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import {
  GET_CUSTOMER_BILLING,
  GET_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_MUTATION,
} from '@/graphql/queries/customer';
import {
  GetCustomerBillingQuery,
  UpdateCustomerMutation,
} from '@/graphql/types/graphql';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CardHeader from '../components/CardHeader';

const Page = () => {
  const t = useTranslations();

  const { schema } = useUserFields();

  const form = useForm<Partial<UserFieldNames>>({
    resolver: yupResolver(schema),
  });

  const [mutateAsync, { loading }] = useMutation<UpdateCustomerMutation>(
    UPDATE_CUSTOMER_MUTATION,
  );

  const client = useApolloClient();

  const onSubmit: SubmitHandler<UserFieldNames> = async (payload) => {
    const { errors } = await mutateAsync({
      variables: {
        billing: payload,
      },
    });
    if (!errors?.length) {
      client.refetchQueries({
        include: [GET_CUSTOMER_PROFILE],
      });
      toast.success(t('messages.defaultSuccess'));
    }
  };

  const customer = useQuery<GetCustomerBillingQuery>(GET_CUSTOMER_BILLING, {
    onCompleted: (data) => {
      const billing = data.customer?.billing!;
      delete billing.__typename;
      form.reset({
        ...billing,
      });
    },
  });

  return (
    <FormProvider {...form}>
      <Card
        variant="outlined"
        sx={{
          flexGrow: 1,
        }}
      >
        <CardContent>
          <CardHeader title={t('profile.accountInfo')} />

          <Grid
            container
            spacing={2}
            onSubmit={form.handleSubmit(onSubmit)}
            component="form"
          >
            <UserFields disabled={loading} loading={customer.loading} />
            <Grid item xs={12}>
              <CustomSkeleton isLoading={customer.loading}>
                <ButtonWithLoading
                  isLoading={loading}
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {t('buttons.save')}
                </ButtonWithLoading>
              </CustomSkeleton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default Page;

'use client';

import CustomSkeleton from '@/components/CustomSkeleton/CustomSkeleton';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { authClient } from '@/graphql/clients/authClient';
import {
  GET_CUSTOMER_BILLING,
  UPDATE_CUSTOMER_MUTATION,
} from '@/graphql/queries/customer';
import { GET_COUNTRY_STATES } from '@/graphql/queries/general';
import {
  GetCountryStatesQuery,
  GetCustomerBillingQuery,
  UpdateCustomerMutation,
} from '@/graphql/types/graphql';
import { Locale, languages } from '@/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useLocale, useTranslations } from 'next-intl';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import CardHeader from '../components/CardHeader';

type FieldNames = Record<
  'firstName' | 'lastName' | 'state' | 'city' | 'address1' | 'postcode',
  string | null
>;

const Page = () => {
  const t = useTranslations();

  const locale = useLocale();

  const states = useQuery<GetCountryStatesQuery>(GET_COUNTRY_STATES, {
    variables: {
      country: languages[locale as Locale].country,
    },
    client: authClient,
  });

  const options =
    states.data?.countryStates?.map((state) => {
      return {
        id: state?.code!,
        value: state?.code!,
        label: state?.name!,
      };
    }) || [];

  const labels: Record<keyof FieldNames, string> = {
    firstName: t('fields.firstName'),
    lastName: t('fields.lastName'),
    state: t('fields.state'),
    city: t('fields.city'),
    address1: t('fields.address1'),
    postcode: t('fields.postcode'),
  };
  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    firstName: yup.string().nullable().required().label(labels.firstName),
    lastName: yup.string().nullable().required().label(labels.lastName),
    state: yup.string().nullable().required().label(labels.state),
    city: yup.string().nullable().required().label(labels.city),
    address1: yup.string().nullable().required().label(labels.address1),
    postcode: yup.string().nullable().required().label(labels.postcode),
  });

  const form = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const [mutateAsync, { loading }] = useMutation<UpdateCustomerMutation>(
    UPDATE_CUSTOMER_MUTATION,
    {
      client: authClient,
    },
  );

  const onSubmit: SubmitHandler<FieldNames> = async (payload) => {
    const { errors } = await mutateAsync({
      variables: {
        billing: payload,
      },
    });
    if (!errors?.length) {
      toast.success(t('messages.defaultSuccess'));
    }
  };

  const customer = useQuery<GetCustomerBillingQuery>(GET_CUSTOMER_BILLING, {
    client: authClient,
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
            <Grid item xs={6}>
              <CustomSkeleton isLoading={customer.loading}>
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        disabled={loading}
                        onChange={onChange}
                        name={name}
                        value={value || ''}
                        variant="outlined"
                        fullWidth
                        label={labels[name]}
                        error={!!error?.message}
                        helperText={error?.message?.toString()}
                        InputProps={{
                          autoComplete: 'new-password',
                        }}
                      />
                    );
                  }}
                />
              </CustomSkeleton>
            </Grid>
            <Grid item xs={6}>
              <CustomSkeleton isLoading={customer.loading}>
                <Controller
                  control={form.control}
                  name="lastName"
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        disabled={loading}
                        onChange={onChange}
                        name={name}
                        value={value || ''}
                        variant="outlined"
                        fullWidth
                        label={labels[name]}
                        error={!!error?.message}
                        helperText={error?.message?.toString()}
                        InputProps={{
                          autoComplete: 'new-password',
                        }}
                      />
                    );
                  }}
                />
              </CustomSkeleton>
            </Grid>
            <Grid item xs={6}>
              <CustomSkeleton isLoading={customer.loading || states.loading}>
                <Controller
                  control={form.control}
                  name="state"
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => {
                    const _value = options.find(
                      (option) => option.value === value,
                    );

                    return (
                      <Autocomplete
                        onChange={(_event, option) => {
                          onChange(option?.value);
                        }}
                        value={_value || { id: '', value: '', label: '' }}
                        options={options}
                        fullWidth
                        disabled={loading}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!error?.message}
                            helperText={error?.message?.toString()}
                            label={labels[name]}
                            InputProps={{
                              autoComplete: 'new-password',
                              ...params.InputProps,
                            }}
                          />
                        )}
                      />
                    );
                  }}
                />
              </CustomSkeleton>
            </Grid>
            <Grid item xs={6}>
              <CustomSkeleton isLoading={customer.loading}>
                <Controller
                  control={form.control}
                  name="city"
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        disabled={loading}
                        onChange={onChange}
                        name={name}
                        value={value || ''}
                        variant="outlined"
                        fullWidth
                        label={labels[name]}
                        error={!!error?.message}
                        helperText={error?.message?.toString()}
                        InputProps={{
                          autoComplete: 'new-password',
                        }}
                      />
                    );
                  }}
                />
              </CustomSkeleton>
            </Grid>
            <Grid item xs={12}>
              <CustomSkeleton isLoading={customer.loading}>
                <Controller
                  control={form.control}
                  name="address1"
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        disabled={loading}
                        multiline
                        rows={3}
                        onChange={onChange}
                        name={name}
                        value={value || ''}
                        variant="outlined"
                        fullWidth
                        label={labels[name]}
                        error={!!error?.message}
                        helperText={error?.message?.toString()}
                        InputProps={{
                          autoComplete: 'new-password',
                        }}
                      />
                    );
                  }}
                />
              </CustomSkeleton>
            </Grid>
            <Grid item xs={12}>
              <CustomSkeleton isLoading={customer.loading}>
                <Controller
                  control={form.control}
                  name="postcode"
                  render={({
                    field: { name, value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        disabled={loading}
                        onChange={onChange}
                        name={name}
                        value={value || ''}
                        variant="outlined"
                        fullWidth
                        label={labels[name]}
                        error={!!error?.message}
                        helperText={error?.message?.toString()}
                        InputProps={{
                          autoComplete: 'new-password',
                        }}
                      />
                    );
                  }}
                />
              </CustomSkeleton>
            </Grid>
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

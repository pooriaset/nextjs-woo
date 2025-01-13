import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { FC } from 'react';
import CustomSkeleton from '../CustomSkeleton/CustomSkeleton';
import { Controller, useFormContext } from 'react-hook-form';
import { useLocale } from 'next-intl';
import { useQuery } from '@apollo/client';
import { GetCountryStatesQuery } from '@/graphql/types/graphql';
import { Locale, languages } from '@/navigation';
import { GET_COUNTRY_STATES } from '@/graphql/queries/general';
import useUserFields from './hooks/useUserFields';

export interface UserFieldsProps {
  loading: boolean;
  disabled: boolean;
}

const UserFields: FC<UserFieldsProps> = ({ loading, disabled }) => {
  const form = useFormContext();
  const locale = useLocale();

  const { labels } = useUserFields();

  const states = useQuery<GetCountryStatesQuery>(GET_COUNTRY_STATES, {
    variables: {
      country: languages[locale as Locale].country,
    },
  });

  const options =
    states.data?.countryStates?.map((state) => {
      return {
        id: state?.code!,
        value: state?.code!,
        label: state?.name!,
      };
    }) || [];

  return (
    <>
      <Grid item xs={6}>
        <CustomSkeleton isLoading={loading}>
          <Controller
            control={form.control}
            name="firstName"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  disabled={disabled}
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
        <CustomSkeleton isLoading={loading}>
          <Controller
            control={form.control}
            name="lastName"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  disabled={disabled}
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
        <CustomSkeleton isLoading={loading || states.loading}>
          <Controller
            control={form.control}
            name="state"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              const _value = options.find((option) => option.value === value);

              return (
                <Autocomplete
                  onChange={(_event, option) => {
                    onChange(option?.value);
                  }}
                  value={_value || { id: '', value: '', label: '' }}
                  options={options}
                  fullWidth
                  disabled={disabled}
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
        <CustomSkeleton isLoading={loading}>
          <Controller
            control={form.control}
            name="city"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  disabled={disabled}
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
        <CustomSkeleton isLoading={loading}>
          <Controller
            control={form.control}
            name="phone"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  disabled={disabled}
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
        <CustomSkeleton isLoading={loading}>
          <Controller
            control={form.control}
            name="postcode"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  disabled={disabled}
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
        <CustomSkeleton isLoading={loading}>
          <Controller
            control={form.control}
            name="address1"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  disabled={disabled}
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
    </>
  );
};

export default UserFields;

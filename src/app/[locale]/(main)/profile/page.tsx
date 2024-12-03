import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();
  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardHeader title={t('profile.myOrders')} />
        <CardContent></CardContent>
      </Card>
    </Stack>
  );
};

export default Page;

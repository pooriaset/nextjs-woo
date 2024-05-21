import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link as NextLink } from '@/navigation';

const Page = () => {
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        mt: 5,
        gap: 2,
      }}
    >
      <Box
        sx={{
          opacity: 0.7,
          filter: 'grayscale(100%)',
        }}
      >
        <Image
          src="/assets/images/cart/unsuccess.svg"
          alt="NotFound"
          width={105}
          height={105}
        />
      </Box>
      <Typography variant="h6">{t('messages.cart.isEmpty')}</Typography>
      <NextLink href="/search">
        <Button variant="outlined">{t('buttons.products')}</Button>
      </NextLink>
    </Box>
  );
};

export default Page;

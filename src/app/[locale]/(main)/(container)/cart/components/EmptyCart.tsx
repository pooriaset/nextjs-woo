import Image from '@/components/common/Image';
import { Link } from '@/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const EmptyCart = () => {
  const t = useTranslations();
  const links = [
    {
      title: t('buttons.products'),
      href: '/search',
    },
    {
      title: t('header.navigation.bestSelling'),
      href: '/best-selling',
    },
    {
      title: t('header.navigation.categories'),
      href: '/categories',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
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
      <Typography variant="caption">
        {t('messages.cart.shortDescription')}
      </Typography>
      <Stack spacing={2} direction="row">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.href}>
              <Button variant="outlined">{link.title}</Button>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

export default EmptyCart;

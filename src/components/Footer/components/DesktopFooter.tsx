'use client';

import Logo from '@/components/common/Logo';
import { IPageListItem } from '@/graphql/types/common';
import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface FooterProps {
  pages: IPageListItem[];
}
const Footer: FC<FooterProps> = ({ pages }) => {
  const t = useTranslations();

  const backToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Logo />
            <Button
              onClick={backToTop}
              variant="outlined"
              color="inherit"
              endIcon={<KeyboardArrowUp />}
              sx={{
                width: 'fit-content',
              }}
            >
              {t('buttons.backToUp')}
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2">{t('footer.text')}</Typography>
            </Box>

            <Typography
              variant="body2"
              align="center"
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              {pages.map((page) => {
                return (
                  <Link key={page.title} href={`/pages/${page.slug}`}>
                    {page.title}
                  </Link>
                );
              })}

              <Link href="#">{t('footer.links.aboutUs')}</Link>

              <Link href="#">{t('footer.links.contactUs')}</Link>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

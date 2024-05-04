'use client';

import { IPageListItem } from '@/app/[locale]/(main)/layout';
import { Box, Container, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface FooterProps {
  pages: IPageListItem[];
}
const Footer: FC<FooterProps> = ({ pages }) => {
  const t = useTranslations();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        py: 2,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
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
      </Container>
    </Box>
  );
};

export default Footer;

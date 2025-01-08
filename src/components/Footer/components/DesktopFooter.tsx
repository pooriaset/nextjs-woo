'use client';

import Image from '@/components/common/Image';
import Logo from '@/components/common/Logo';
import { IPageListItem } from '@/graphql/types/common';
import { KeyboardArrowUp } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import BadgeImage from './BadgeImage';
import Newsletter from './Newsletter';
import SocialMedia from './SocialMedia';
import { phoneNumber } from '@/config/app';
import { getPhoneNumber } from '@/utils/number';

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

  const badges = [
    {
      id: '1',
      src: null,
      title: 'Title',
      href: '#',
    },
    {
      id: '2',
      src: null,
      title: 'Title',
      href: '#',
    },
    {
      id: '3',
      src: null,
      title: 'Title',
      href: '#',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={2}>
              <Logo />
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  variant="body2"
                  component={Link}
                  href={`tel:${getPhoneNumber(phoneNumber)}`}
                  color="text.primary"
                >
                  {t.rich('footer.support.phoneNumber', {
                    span: () => (
                      <Box component="span" letterSpacing={1.5} dir="ltr">
                        {phoneNumber}
                      </Box>
                    ),
                  })}
                </Typography>
                <span>|</span>
                <Typography variant="body2" color="text.primary">
                  {t('footer.support.customerServiceHours:')}
                </Typography>
              </Stack>
            </Stack>
            <Button
              onClick={backToTop}
              variant="outlined"
              color="inherit"
              endIcon={<KeyboardArrowUp />}
              sx={{
                width: 'fit-content',
                borderColor: 'divider',
              }}
            >
              {t('buttons.backToUp')}
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={4}>
              <SocialMedia />
              <Newsletter />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6">{t('footer.links.title')}</Typography>
              <Stack spacing={1}>
                {pages.map((page) => {
                  return (
                    <Link key={page.title} href={`/pages/${page.slug}`}>
                      {page.title}
                    </Link>
                  );
                })}

                <Link href="#">{t('footer.links.aboutUs')}</Link>

                <Link href="#">{t('footer.links.contactUs')}</Link>
              </Stack>
            </Stack>

            <Stack spacing={1} direction="row">
              {badges.map((badge) => {
                return (
                  <Tooltip title={badge.title} key={badge.id}>
                    <BadgeImage href={badge.href}>
                      <Image
                        width={100}
                        height={100}
                        src={badge.src}
                        alt={badge.title}
                      />
                    </BadgeImage>
                  </Tooltip>
                );
              })}
            </Stack>
          </Stack>
          <Divider />

          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
            }}
          >
            {t('footer.text')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

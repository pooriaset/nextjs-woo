import FilledBale from '@/components/Icons/components/Use/FilledBale';
import { Email, Instagram, Phone, Telegram } from '@mui/icons-material';
import { Stack, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import SocialMediaButton from './SocialMediaButton';

const socialMediaButtons = [
  {
    id: 'instagram',
    title: 'Instagram',
    icon: <Instagram />,
    link: '#',
  },
  {
    id: 'telegram',
    title: 'Telegram',
    icon: <Telegram />,
    link: '#',
  },
  {
    id: 'bale',
    title: 'Bale',
    icon: <FilledBale />,
    link: '#',
  },
  {
    id: 'phone',
    title: 'Phone',
    icon: <Phone />,
    link: '#',
  },
  {
    id: 'email',
    title: 'Email',
    icon: <Email />,
    link: '#',
  },
];

const SocialMedia = () => {
  const t = useTranslations();

  return (
    <Stack spacing={1}>
      <Typography variant="h6">{t('footer.links.contactUs')}</Typography>
      <Stack direction="row" spacing={1}>
        {socialMediaButtons.map((button) => {
          return (
            <Tooltip key={button.id} title={button.title}>
              <a href={button.link}>
                <SocialMediaButton size="small">
                  {button.icon}
                </SocialMediaButton>
              </a>
            </Tooltip>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SocialMedia;

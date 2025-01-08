import { Instagram, Telegram } from '@mui/icons-material';
import { Stack, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import SocialMediaButton from './SocialMediaButton';

const socialMediaButtons = [
  {
    id: 'instagram',
    title: 'Instagram',
    icon: <Instagram />,
    link: 'https://instagram.com',
  },
  {
    id: 'telegram',
    title: 'Telegram',
    icon: <Telegram />,
    link: 'https://telegram.me/',
  },
];

const SocialMedia = () => {
  const t = useTranslations();

  return (
    <Stack spacing={1}>
      <Typography variant="h6">{t('footer.socialMedia.stayTuned')}</Typography>
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

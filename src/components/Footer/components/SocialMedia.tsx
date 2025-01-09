import { Instagram, Telegram, X } from '@mui/icons-material';
import { Stack, Tooltip, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import SocialMediaButton from './SocialMediaButton';

const SocialMedia = () => {
  const t = useTranslations();

  const socialMediaButtons = [
    {
      id: 'instagram',
      title: t('footer.socialMedia.items.instagram'),
      icon: <Instagram />,
      link: 'https://instagram.com',
    },
    {
      id: 'telegram',
      title: t('footer.socialMedia.items.telegram'),
      icon: <Telegram />,
      link: 'https://telegram.me/',
    },
    {
      id: 'x',
      title: t('footer.socialMedia.items.x'),
      icon: <X />,
      link: 'https://x.com/',
    },
  ];

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

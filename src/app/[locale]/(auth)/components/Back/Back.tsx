'use client';

import { useRouter } from '@/navigation';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslations } from 'next-intl';

const Back = () => {
  const t = useTranslations();
  const router = useRouter();
  const handleClickOnButton = () => {
    router.back();
  };

  return (
    <Button
      sx={{
        width: 'fit-content',
        color: grey[600],
        '& .MuiButton-icon': {
          mr: 0.5,
        },
      }}
      startIcon={<ArrowForwardOutlined fontSize="small" />}
      variant="text"
      color="inherit"
      onClick={handleClickOnButton}
    >
      {t('buttons.back')}
    </Button>
  );
};

export default Back;

import { useRouter } from '@/navigation';
import { ChevronLeft } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface CardHeaderProps {
  title: string;
  children?: ReactNode;
  back?: boolean;
}
const CardHeader: FC<CardHeaderProps> = ({ title, children, back }) => {
  const router = useRouter();

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {back && (
            <IconButton size="small" onClick={() => router.back()}>
              <ChevronLeft
                sx={{
                  transform: (theme) =>
                    theme.direction === 'rtl' ? 'rotate(180deg)' : undefined,
                }}
              />
            </IconButton>
          )}
          <Typography variant="subtitle1">{title}</Typography>
        </Stack>
        {children}
      </Stack>
      <Divider />
    </Stack>
  );
};

export default CardHeader;

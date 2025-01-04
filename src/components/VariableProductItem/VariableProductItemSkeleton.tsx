'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Box, Skeleton, Stack } from '@mui/material';
import { Container } from './Container';

const VariableProductItemSkeleton = () => {
  const { variantImageSize, isMobile } = useAppContext();

  return (
    <Container>
      <Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: 1,
          }}
        >
          <Skeleton
            variant="rectangular"
            height={variantImageSize}
            width="100%"
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
              p: 1,
            }}
          >
            <Skeleton variant="text" width={90} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <Box>
                <Skeleton variant="text" width={40} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default VariableProductItemSkeleton;

'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Box, Card, CardContent, Skeleton } from '@mui/material';

const VariableProductItemSkeleton = () => {
  const { variantImageSize, isMobile } = useAppContext();

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'block',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
          {!isMobile && <Box mt={3} />}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
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
      </CardContent>
    </Card>
  );
};

export default VariableProductItemSkeleton;

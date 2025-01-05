'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Box, Skeleton, Stack } from '@mui/material';
import { FC } from 'react';
import { Container } from './Container';

export interface VariableProductItemSkeletonProps {
  vertical?: boolean;
}

const VariableProductItemSkeleton: FC<VariableProductItemSkeletonProps> = ({
  vertical,
}) => {
  const { variantImageSize, isMobile } = useAppContext();
  const _horizontal = isMobile && !vertical;

  return (
    <Container>
      <Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: _horizontal ? 'row' : 'column',
            gap: 1,
          }}
        >
          <Skeleton
            variant="rectangular"
            height={variantImageSize}
            width={variantImageSize}
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

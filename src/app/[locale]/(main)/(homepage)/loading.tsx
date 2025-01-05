'use client';

import { MobileView } from '@/components/ResponsiveDesign';
import { VariableProductItemSkeleton } from '@/components/VariableProductItem';
import { useAppContext } from '@/hooks/useAppContext';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
} from '@mui/material';
import SlidersSkeleton from './components/SlidersSkeleton';

const Loading = () => {
  const { isMobile } = useAppContext();
  const width = isMobile ? 100 : 160;
  return (
    <>
      <MobileView>
        <Container maxWidth="xl">
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            height={56}
          >
            <Skeleton width="100%" variant="rectangular" height={45} />
          </Stack>
        </Container>
      </MobileView>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SlidersSkeleton />
        </Grid>

        <Grid item xs={12}>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  flexWrap="nowrap"
                  spacing={isMobile ? 1 : 2}
                  sx={{
                    overflow: 'hidden',
                  }}
                >
                  {new Array(6).fill(1).map((_item, index) => {
                    return (
                      <Stack key={index.toString()} alignItems="center">
                        <Skeleton
                          width={width}
                          variant="circular"
                          height={width}
                          sx={{
                            borderRadius: '50%',
                          }}
                        />
                        <Skeleton variant="text" width={60} />
                      </Stack>
                    );
                  })}
                </Stack>
              </Grid>
              {new Array(3).fill(1).map((item) => (
                <Grid item xs={12} key={item}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={2}
                        flexWrap="nowrap"
                        overflow="hidden"
                      >
                        {new Array(6).fill(1).map((_item, index) => {
                          return (
                            <Stack
                              width={isMobile ? 150 : 240}
                              key={index.toString()}
                            >
                              <VariableProductItemSkeleton />
                            </Stack>
                          );
                        })}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Loading;

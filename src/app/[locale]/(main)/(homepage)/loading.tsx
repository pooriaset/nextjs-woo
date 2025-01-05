'use client';

import { MobileView } from '@/components/ResponsiveDesign';
import { VariableProductItemSkeleton } from '@/components/VariableProductItem';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
} from '@mui/material';
import SlidersSkeleton from './components/SlidersSkeleton';
import { useAppContext } from '@/hooks/useAppContext';

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
                      <Grid container spacing={2}>
                        {new Array(6).fill(1).map((_item, index) => {
                          return (
                            <Grid key={index} item xs={12} md={6} lg={3} xl={2}>
                              <VariableProductItemSkeleton />
                            </Grid>
                          );
                        })}
                      </Grid>
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

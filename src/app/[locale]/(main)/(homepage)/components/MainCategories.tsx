'use client';

import Image from '@/components/common/Image';
import { useAppContext } from '@/hooks/useAppContext';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

export interface IMainCategory {
  id: number | string;
  title: string;
  imageUrl: string;
}
export interface MainCategoriesProps {
  items: IMainCategory[];
}
const MainCategories: FC<MainCategoriesProps> = ({ items }) => {
  const { isMobile } = useAppContext();
  return (
    <Grid container justifyContent="center" gap={2}>
      {items.map((item) => {
        const params = new URLSearchParams();
        params.set('categoryId', item.id.toString());

        return (
          <Grid key={item.id} item xs={4} md={4} lg={2}>
            <Link href={`/search?${params.toString()}`}>
              <Stack spacing={1} alignItems="end">
                <Box
                  width="100%"
                  height={isMobile ? 100 : 210}
                  sx={{
                    bgcolor: grey[100],
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Image
                    width={350}
                    height={350}
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </Box>

                <Stack direction="row" spacing={1}>
                  <Typography variant="body2">{item.title}</Typography>
                  {!isMobile && (
                    <ChevronLeft
                      fontSize="small"
                      sx={{
                        transform: (theme) =>
                          theme.direction === 'ltr' ? 'rotate(180deg)' : null,
                      }}
                    />
                  )}
                </Stack>
              </Stack>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MainCategories;

import Image from '@/components/common/Image';
import { Link } from '@/navigation';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface SubCategoryItemProps {
  id: string;
  name: string;
  src: string;
}
const SubCategoryItem: FC<SubCategoryItemProps> = ({ id, src, name }) => {
  return (
    <Stack
      spacing={1}
      width="30%"
      alignItems="center"
      component={Link}
      href="#"
      sx={{
        height: 'fit-content',
        maxHeight: 'auto',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          bgcolor: (theme) => theme.palette.grey[200],
          borderRadius: 1.5,
          height: 'fit-content',
        }}
      >
        <Image width={82} height={82} src={src} alt={name} />
      </Stack>
      <Typography
        color="text.primary"
        variant="body2"
        sx={{
          // whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
        }}
      >
        {name}
      </Typography>
    </Stack>
  );
};

export default SubCategoryItem;

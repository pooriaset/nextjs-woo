import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import { Link as NextLink } from '@/navigation';
import { bestSellingSortOption } from '@/static/sortOptions';

const BottomSection = () => {
  const t = useTranslations();

  const pages = [
    { label: t('header.navigation.products'), href: '/search' },
    { label: t('header.navigation.categories'), href: '/categories' },
    {
      label: t('header.navigation.bestSelling'),
      href: `/search?sort=${bestSellingSortOption.key}`,
    },
    { label: t('header.navigation.promotions'), href: '/promotion-center' },
  ];

  return (
    <Box
      sx={{
        py: 1,
        display: 'flex',
      }}
    >
      {pages.map((page) => (
        <Button LinkComponent={NextLink} href={page.href} key={page.label}>
          {page.label}
        </Button>
      ))}
    </Box>
  );
};
export default BottomSection;

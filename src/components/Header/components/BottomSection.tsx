import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

const pages = [
  { label: "محصولات", href: "/search" },
  { label: "دسته‌بندی کالاها", href: "/categories" },
  { label: "پرفروش‌ترین‌ها", href: "/best-selling" },
  { label: "تخفیف‌ها و پیشنهادها", href: "/promotion-center" },
];

const BottomSection = () => {
  return (
    <Box
      sx={{
        py: 1,
        display: "flex",
      }}
    >
      {pages.map((page) => (
        <Button LinkComponent={Link} href={page.href} key={page.label}>
          {page.label}
        </Button>
      ))}
    </Box>
  );
};
export default BottomSection;

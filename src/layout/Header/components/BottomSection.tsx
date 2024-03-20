import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const pages = [
  "محصولات",
  "دسته‌بندی کالاها",
  "پرفروش‌ترین‌ها",
  "تخفیف‌ها و پیشنهادها",
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
        <Button key={page}>{page}</Button>
      ))}
    </Box>
  );
};
export default BottomSection;

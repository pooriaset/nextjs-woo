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
    <Box sx={{ display: "flex", py: 1 }}>
      {pages.map((page) => (
        <Button key={page}>{page}</Button>
      ))}
    </Box>
  );
};
export default BottomSection;

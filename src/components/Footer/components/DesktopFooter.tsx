import { Box, Container, Link, Typography } from "@mui/material";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: (theme) => theme.palette.divider,
        py: 2,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2">
            تمامی حقوق سایت متعلق به تیم آنلاین شاپ می‌باشد
          </Typography>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Link component={NextLink} href="#">
            درباره‌ی ما
          </Link>

          <Link component={NextLink} href="#">
            تماس با ما
          </Link>

          <Link component={NextLink} href="#">
            شرایط استفاده
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

import { Box, Container, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={6} textAlign="center">
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" align="center">
              <Link href="#" color="inherit" sx={{ mx: 1 }}>
                درباره‌ی ما
              </Link>
              <Link href="#" color="inherit" sx={{ mx: 1 }}>
                تماس با ما
              </Link>
              <Link href="#" color="inherit" sx={{ mx: 1 }}>
                شرایط استفاده
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;

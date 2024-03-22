import { FC } from "react";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { BuyBox } from "@/components/BuyBox";
import { ProductImages } from "@/components/ProductImages";
import SizeSelector from "@/components/SizeSelector/SizeSelector";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import type { Metadata } from "next";
import { headers } from "next/headers";

type PageProps = {
  params: { id: string };
};

const title = "محصول تست فروشگاه مدل تستی رنگ مشکی";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params.id;
  const url = new URL(headers().get("x-url")!);
  const slug = title.replaceAll(" ", "-");

  return {
    title,
    alternates: {
      canonical: `${url.origin}/products/${id}/${slug}`,
    },
  };
}

const Page: FC<PageProps> = ({ params }) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <ProductImages />
        </Grid>
        <Grid item md={5} xs={12}>
          <Breadcrumbs />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 2.1,
              fontSize: "1rem",
            }}
          >
            {title}
          </Typography>
          <Divider />
          <Grid
            container
            spacing={1}
            sx={{
              mt: 2,
            }}
          >
            <Grid item xs={6} md={4} lg={3}>
              <SizeSelector />
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: "100%",
                }}
              >
                سایز من چنده؟
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent
              sx={{
                backgroundColor: grey[100],
              }}
            >
              <BuyBox />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;

import { FC } from "react";

import Image from "@/components/common/Image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import SizeSelector from "@/components/SizeSelector";
import PriceLabel from "@/components/common/PriceLabel";
import DiscountPercentage from "@/components/common/DiscountPercentage";
import OldPrice from "@/components/common/OldPrice";
import { grey } from "@mui/material/colors";
import BuyBox from "@/components/BuyBox";

type PageProps = {
  params: { id: string };
};

const title = "محصول تست فروشگاه مدل تستی رنگ مشکی";

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
          <Image
            width={500}
            height={500}
            src="/assets/images/placeholders/500x500.png"
            alt="Product Image"
          />
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

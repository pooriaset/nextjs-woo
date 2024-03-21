import { Badge, Box, Card, CardContent, Chip, Typography } from "@mui/material";

import Image from "../common/Image";
import useIsMobile from "@/hooks/useIsMobile";
import PriceLabel from "../common/PriceLabel";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import DiscountPercentage from "../common/DiscountPercentage";
import OldPrice from "../common/OldPrice";

const ProductItem = () => {
  const isMobile = useIsMobile();

  const size = isMobile ? 120 : 240;

  const oldPrice = 2560000;

  return (
    <Card
      component={Link}
      href={`/products/2546/title`}
      sx={{
        display: "block",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: 1,
          }}
        >
          <Image
            height={size}
            width={size}
            src="/assets/images/placeholders/300x300.png"
            alt="Product Image"
            style={{
              objectFit: "contain",
              display: "block",
              width: isMobile ? 120 : "100%",
            }}
          />
          {!isMobile && <Box mt={3} />}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
              width: "100%",
            }}
          >
            <Typography variant="body2">
              محصول تست فروشگاه مدل تستی رنگ مشکی
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "top",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <DiscountPercentage value={37} />
              <Box>
                <PriceLabel value={1568000} />
                <OldPrice value={2560000} />
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;

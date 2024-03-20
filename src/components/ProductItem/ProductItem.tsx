import { Card, CardContent, CardMedia } from "@mui/material";
import Image from "next/image";
import React from "react";

const ProductItem = () => {
  return (
    <Card>
      <CardContent>
        <CardMedia
          component={Image}
          height={80}
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
      </CardContent>
    </Card>
  );
};

export default ProductItem;

import { Card, CardContent, CardMedia } from "@mui/material";

import React from "react";
import Image from "../common/Image";

const ProductItem = () => {
  return (
    <Card>
      <CardContent>
        <Image
          height={100}
          width={100}
          src="/assets/images/placeholders/100x100.jpg"
          alt="Product Image"
        />
      </CardContent>
    </Card>
  );
};

export default ProductItem;

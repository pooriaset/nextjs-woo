import { Grid } from "@mui/material";
import React from "react";
import { ProductItem } from "../ProductItem";

const ProductsList = () => {
  return (
    <Grid container spacing={1}>
      {new Array(16).fill(1).map((item, index) => {
        return (
          <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
            <ProductItem />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsList;

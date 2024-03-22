"use client";

import { Box } from "@mui/material";
import React from "react";
import Image from "../common/Image";

const ProductImages = () => {
  return (
    <>
      <Image
        width={500}
        height={500}
        src="/assets/images/placeholders/500x500.png"
        alt="Product Image"
        draggable={false}
        style={{
          userSelect: "none",
          width: "100%",
        }}
      />
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {new Array(5).fill(1).map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                border: "1px solid",
                borderColor: (theme) => theme.palette.divider,
                borderRadius: 1,
                width: 72,
                height: 72,
              }}
            >
              <Image
                draggable={false}
                width={72}
                height={72}
                alt="product image"
                src="/assets/images/placeholders/72x72.png"
                style={{
                  objectFit: "contain",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ProductImages;

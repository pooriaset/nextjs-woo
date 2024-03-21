"use client";
import { Chip } from "@mui/material";
import React, { FC } from "react";

export interface DiscountPercentageProps {
  value: number;
}

const DiscountPercentage: FC<DiscountPercentageProps> = ({ value }) => {
  return (
    <Chip
      size="small"
      color="error"
      label={`${value}%`}
      sx={{
        fontWeight: 600,
        fontSize: (theme) => theme.typography.caption.fontSize,
      }}
    />
  );
};

export default DiscountPercentage;

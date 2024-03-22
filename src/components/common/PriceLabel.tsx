import { FC } from "react";

import PriceUnit from "./PriceUnit";
import { Box, Typography } from "@mui/material";

export interface PriceLabelProps {
  value: number;
}

const PriceLabel: FC<PriceLabelProps> = ({ value }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        {value.toLocaleString()}
      </Typography>
      <PriceUnit />
    </Box>
  );
};

export default PriceLabel;

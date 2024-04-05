import { extractNumbers } from "@/utils/price";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";

export interface OldPriceProps {
  value: string;
}

const OldPrice: FC<OldPriceProps> = ({ value }) => {
  return (
    <Typography
      variant="caption"
      sx={{
        textDecorationLine: "line-through",
        color: grey[500],
      }}
    >
      {extractNumbers(value).toLocaleString()}
    </Typography>
  );
};

export default OldPrice;

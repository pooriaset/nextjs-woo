import { Typography } from "@mui/material";

const PriceUnit = () => {
  return (
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 400,
        userSelect: "none",
        paddingLeft: 0.5,
      }}
    >
      تومان
    </Typography>
  );
};

export default PriceUnit;

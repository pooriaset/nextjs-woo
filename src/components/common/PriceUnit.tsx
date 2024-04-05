import { Typography } from "@mui/material";

const PriceUnit = ({ title = "تومان" }) => {
  return (
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 400,
        userSelect: "none",
        paddingLeft: 0.5,
      }}
    >
      {title}
    </Typography>
  );
};

export default PriceUnit;

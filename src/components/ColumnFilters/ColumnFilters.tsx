import { Card, CardContent } from "@mui/material";
import React from "react";

const ColumnFilters = () => {
  return (
    <Card
      sx={{
        position: "sticky",
        top: 130,
      }}
    >
      <CardContent>Filters</CardContent>
    </Card>
  );
};

export default ColumnFilters;

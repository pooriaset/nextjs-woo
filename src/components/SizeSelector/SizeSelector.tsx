"use client";

import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

function SizeSelector() {
  const [size, setSize] = useState("42");

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel id="size-select-label">سایز</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          value={size}
          label="سایز"
          onChange={handleChange}
        >
          {[42, 43, 45, 46, 47].map((size) => {
            return (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SizeSelector;

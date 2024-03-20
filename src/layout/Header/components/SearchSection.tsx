import { SearchOutlined } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { IconButton, IconButtonProps, TextField } from "@mui/material";
import { FC } from "react";

export interface SearchSectionProps {
  onClickOnBack?: IconButtonProps["onClick"];
  onClickOnSearch?: IconButtonProps["onClick"];
}

const SearchSection: FC<SearchSectionProps> = ({
  onClickOnBack,
  onClickOnSearch,
}) => {
  return (
    <TextField
      placeholder="جستجو"
      InputProps={{
        startAdornment: (
          <IconButton onClick={onClickOnBack}>
            <ArrowForwardOutlinedIcon />
          </IconButton>
        ),
        endAdornment: (
          <IconButton onClick={onClickOnSearch}>
            <SearchOutlined />
          </IconButton>
        ),
      }}
      fullWidth
      size="medium"
      variant="outlined"
    />
  );
};

export default SearchSection;

import useInputFiller from "@/hooks/useInputFiller";
import { SearchOutlined } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { IconButton, IconButtonProps, TextField } from "@mui/material";
import { DOMAttributes, FC } from "react";

export interface SearchSectionProps {
  onClickOnBack?: IconButtonProps["onClick"];
  onClickOnSearch?: (q: string) => void;
}

const SearchSection: FC<SearchSectionProps> = ({
  onClickOnBack,
  onClickOnSearch,
}) => {
  const { inputRef } = useInputFiller();

  const onSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (event) => {
    event.preventDefault();
    onClickOnSearch?.(event.currentTarget.q.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        inputRef={inputRef}
        autoComplete="off"
        name="q"
        placeholder="جستجو"
        InputProps={{
          startAdornment: (
            <IconButton onClick={onClickOnBack}>
              <ArrowForwardOutlinedIcon />
            </IconButton>
          ),
          endAdornment: (
            <IconButton type="submit">
              <SearchOutlined />
            </IconButton>
          ),
        }}
        fullWidth
        size="medium"
        variant="outlined"
      />
    </form>
  );
};

export default SearchSection;

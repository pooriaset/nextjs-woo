import useIsMobile from "@/hooks/useIsMobile";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import SearchDialog from "./SearchDialog";

const MobileView = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    return null;
  }

  const handleToggleDialog = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box
        onClick={handleToggleDialog}
        sx={{
          my: 1,
          backgroundColor: grey[200],
          width: "100%",
          borderRadius: (theme) => theme.shape.borderRadius,
          height: 44,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <SearchOutlined
          htmlColor={grey[500]}
          sx={{
            height: 24,
            ml: 2,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: grey[500],
            pl: 1,
          }}
        >
          جستجو در
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontWeight: "bold",
            pl: 0.5,
          }}
        >
          {/* Your custom logo */}
          شاپ
        </Typography>
      </Box>
      <SearchDialog open={open} onClose={handleToggleDialog} />
    </>
  );
};

export default MobileView;

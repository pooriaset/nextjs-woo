import Transition from "@/components/common/Transition";
import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogProps } from "@mui/material";
import React, { FC } from "react";

const SearchDialog: FC<DialogProps> = (props) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      aria-labelledby="search-dialog"
      {...props}
    >
      <DialogContent
        sx={{
          pb: 9,
        }}
      >
        {props.children}
        <Box
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2.5),
            left: (theme) => theme.spacing(3),
            right: (theme) => theme.spacing(3),
          }}
        >
          <Button
            size="large"
            fullWidth
            variant="outlined"
            endIcon={<ChevronLeft />}
            onClick={(event) => props?.onClose?.(event, "escapeKeyDown")}
          >
            بازگشت
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;

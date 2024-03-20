"use client";

import React from "react";
import { TopSection, BottomSection } from "./components";
import { AppBar, Container, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      color="default"
      elevation={0}
      position="static"
      sx={{
        borderBottom: "2px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Container maxWidth="xl">
        <TopSection />
        <BottomSection />
      </Container>
    </AppBar>
  );
};

export default Header;

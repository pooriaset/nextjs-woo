"use client";

import { AppBar, Container } from "@mui/material";
import { DesktopView, MobileView } from "./components";

const Header = () => {
  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        borderBottom: "2px solid",
        borderColor: (theme) => theme.palette.divider,
        position: "sticky",
        top: 0,
        backgroundColor: "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <DesktopView />
        <MobileView />
      </Container>
    </AppBar>
  );
};

export default Header;

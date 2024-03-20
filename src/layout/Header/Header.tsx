"use client";

import { AppBar, Container } from "@mui/material";
import { DesktopView, MobileView } from "./components";

const Header = () => {
  return (
    <AppBar
      color="default"
      elevation={0}
      position="static"
      sx={{
        borderBottom: "2px solid",
        borderColor: (theme) => theme.palette.divider,
        position: "sticky",
        top: 0,
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

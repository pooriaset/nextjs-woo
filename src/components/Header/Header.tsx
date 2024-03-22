"use client";

import { AppBar, Container } from "@mui/material";
import { DesktopView, MobileView } from "./components";
import { Suspense } from "react";
import useIsMobile from "@/hooks/useIsMobile";

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        borderBottom: "2px solid",
        borderColor: (theme) => theme.palette.divider,
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        {isMobile ? (
          <Suspense>
            <MobileView />
          </Suspense>
        ) : (
          <DesktopView />
        )}
      </Container>
    </AppBar>
  );
};

export default Header;

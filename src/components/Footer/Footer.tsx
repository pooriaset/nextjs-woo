"use client";

import { DesktopFooter, MobileFooter } from "./components";
import { Box } from "@mui/material";
import { useAppContext } from "@/hooks/useAppContext";

const Footer = () => {
  const { isMobile } = useAppContext();

  return <Box mt={2}>{isMobile ? <MobileFooter /> : <DesktopFooter />}</Box>;
};

export default Footer;

"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { DesktopFooter, MobileFooter } from "./components";
import { Box } from "@mui/material";

const Footer = () => {
  const isMobile = useIsMobile();

  return <Box mt={2}>{isMobile ? <MobileFooter /> : <DesktopFooter />}</Box>;
};

export default Footer;

"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { DesktopFooter, MobileFooter } from "./components";

const Footer = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileFooter />;
  }

  return <DesktopFooter />;
};

export default Footer;

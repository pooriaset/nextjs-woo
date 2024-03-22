import { isMobileBrowser } from "@/utils/responsive";
import { useMediaQuery, useTheme } from "@mui/material";

const useIsMobile = () => {
  const theme = useTheme();
  const isBreakpointValid = useMediaQuery(theme.breakpoints.down("md"));

  return isMobileBrowser() || isBreakpointValid;
};

export default useIsMobile;

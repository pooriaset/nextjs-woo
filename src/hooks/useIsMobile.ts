import { isMobileBrowser } from "@/utils/responsive";
import { useMediaQuery, useTheme } from "@mui/material";

const useIsMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobileBrowser() || isMobile;
};

export default useIsMobile;

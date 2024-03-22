"use client";

import {
  AccountBalanceWalletOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import DiscountPercentage from "../common/DiscountPercentage";
import OldPrice from "../common/OldPrice";
import PriceLabel from "../common/PriceLabel";
import { useAppContext } from "@/hooks/useAppContext";

const listItems = [
  {
    text: "ارسال از دو روز کاری دیگر",
    icon: <LocalShippingOutlined />,
  },
  {
    text: "5% بازگشت به اعتبار",
    icon: <AccountBalanceWalletOutlined />,
  },
];

const BuyBox = () => {
  const { isMobile } = useAppContext();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
      }}
    >
      <List>
        {listItems.map((item) => {
          return (
            <>
              <ListItem
                disablePadding
                sx={{
                  py: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 1,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: grey[700],
                    fontSize: (theme) => theme.typography.caption.fontSize,
                  }}
                />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
          }}
        >
          <OldPrice value={2560000} />
          <DiscountPercentage value={37} />
        </Box>
        <PriceLabel value={1556400} />
      </Box>
      <Box>
        <Button fullWidth variant="contained" color="error" size="large">
          افزودن به سبد خرید
        </Button>
      </Box>
    </Box>
  );
};

export default BuyBox;

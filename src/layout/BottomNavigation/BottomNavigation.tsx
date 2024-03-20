"use client";

import Box from "@mui/material/Box";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactNode, useState } from "react";
import {
  AccountCircleOutlined,
  HomeOutlined,
  ShoppingBasketOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

interface Page {
  label: string;
  href: string;
  icon: ReactNode;
}

const pages: Page[] = [
  {
    label: "خانه",
    href: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "دسته‌بندی‌ها",
    href: "/categories",
    icon: <CategoryOutlined />,
  },
  {
    label: "سبد خرید",
    href: "/cart",
    icon: <ShoppingBasketOutlined />,
  },
  {
    label: "حساب من",
    href: "/account",
    icon: <AccountCircleOutlined />,
  },
];

const BottomNavigation = () => {
  const [value, setValue] = useState(0);
  const pathname = usePathname();

  const isMobile = useIsMobile();
  if (!isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        boxShadow: (theme) => theme.shadows[3],
      }}
    >
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {pages.map((page) => {
          return (
            <BottomNavigationAction
              key={page.label}
              LinkComponent={Link}
              href={page.href}
              label={page.label}
              icon={page.icon}
            />
          );
        })}
      </MuiBottomNavigation>
    </Box>
  );
};

export default BottomNavigation;

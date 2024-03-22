"use client";

import {
  AccountCircleOutlined,
  CategoryOutlined,
  HomeOutlined,
  ShoppingBasketOutlined,
} from "@mui/icons-material";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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

const MobileFooter = () => {
  const pathname = usePathname();

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
        value={pages.findIndex((page) => page.href === pathname)}
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

export default MobileFooter;

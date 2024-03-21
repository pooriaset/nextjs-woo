"use client";

import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import * as React from "react";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

function Breadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Link
          variant="body2"
          component={NextLink}
          underline="hover"
          href="/categories/primary"
        >
          دسته‌بندی اصلی
        </Link>
        <Link
          variant="body2"
          component={NextLink}
          underline="hover"
          href="/categories/secondary"
        >
          دسته‌بندی فرعی
        </Link>
      </MuiBreadcrumbs>
    </div>
  );
}
export default Breadcrumbs;

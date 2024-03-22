"use client";

import { ColumnFilters } from "@/components/ColumnFilters";
import { InlineFilters } from "@/components/InlineFilters";
import ProductsList from "@/components/ProductsList/ProductsList";
import useIsMobile from "@/hooks/useIsMobile";
import { Box, Container } from "@mui/material";
import React from "react";

const Page = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <InlineFilters />

        <Container sx={{ mt: 2 }}>
          <ProductsList />
        </Container>
      </>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          position: "relative",
        }}
      >
        <Box
          sx={{
            minWidth: 270,
            width: 300,
          }}
        >
          <ColumnFilters />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ProductsList />
        </Box>
      </Box>
    </Container>
  );
};

export default Page;

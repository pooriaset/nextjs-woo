"use client";

import { ColumnFilters } from "@/components/ColumnFilters";
import { InlineFilters } from "@/components/InlineFilters";
import ProductsCount from "@/components/ProductsCount/ProductsCount";
import ProductsList from "@/components/ProductsList/ProductsList";
import SortRow from "@/components/SortRow/SortRow";
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
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              borderBottom: "1px solid",
              borderColor: (theme) => theme.palette.divider,
            }}
          >
            <SortRow />
            <ProductsCount />
          </Box>
          <ProductsList />
        </Box>
      </Box>
    </Container>
  );
};

export default Page;

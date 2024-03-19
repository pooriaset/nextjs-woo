"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { FC, ReactNode } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const RTLProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};

export default RTLProvider;

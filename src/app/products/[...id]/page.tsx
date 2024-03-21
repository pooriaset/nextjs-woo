import Head from "next/head";
import { FC } from "react";

import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const url = new URL(headers().get("x-url")!);
  const title = "محصول تست فروشگاه مدل تستی رنگ مشکی";
  const slug = title.replaceAll(" ", "-");

  return {
    title,
    alternates: {
      canonical: `${url.origin}/products/${id}/${slug}`,
    },
  };
}

const Page: FC<PageProps> = ({ params }) => {
  const title = "عنوان محصول";

  return <>Hello</>;
};

export default Page;

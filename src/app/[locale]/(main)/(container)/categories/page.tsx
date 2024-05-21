import { Sleep } from '@/services/common';
import React from 'react';

const Page = async () => {
  await Sleep(5000);
  return <div>Categories</div>;
};

export default Page;

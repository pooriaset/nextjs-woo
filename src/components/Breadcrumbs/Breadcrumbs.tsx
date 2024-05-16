'use client';

import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import type { FC } from 'react';

export interface BreadcrumbItem {
  id: number | string;
  name: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {items.map((item) => {
          const params = new URLSearchParams();
          params.set('categoryId', item.id.toString());
          const href = `/search?${params.toString()}`;

          return (
            <Link key={item.id} variant="body2" underline="hover" href={href}>
              {item.name}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};
export default Breadcrumbs;

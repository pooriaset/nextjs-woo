'use client';

import { Link as NextLink } from '@/navigation';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import type { FC } from 'react';

export interface BreadcrumbItem {
  id: number | string;
  title: string;
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
          const href = '';
          return (
            <Link
              key={item.id}
              variant="body2"
              component={NextLink}
              underline="hover"
              href={href}
            >
              {item.title}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};
export default Breadcrumbs;

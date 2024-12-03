import React, { FC } from 'react';

export interface DotIconProps {
  color?: string;
}
const DotIcon: FC<DotIconProps> = ({ color = null }) => {
  return (
    <svg style={{ width: 18, height: 18, fill: color || 'currentcolor' }}>
      <use xlinkHref="#dotOutline"></use>
    </svg>
  );
};

export default DotIcon;

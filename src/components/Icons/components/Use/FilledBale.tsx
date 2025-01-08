import { FC } from 'react';

export interface FilledBaleProps {
  color?: string;
}
const FilledBale: FC<FilledBaleProps> = ({ color = null }) => {
  return (
    <svg style={{ width: 20, height: 20, fill: color || 'currentcolor' }}>
      <use xlinkHref="#filledBale"></use>
    </svg>
  );
};

export default FilledBale;

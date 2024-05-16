import { List } from '@mui/material';
import { FC } from 'react';
import Item from './components/Item';
import { IKeyValueItem } from './types';

export interface KeyValueViewerProps {
  items: IKeyValueItem[];
}

const KeyValueViewer: FC<KeyValueViewerProps> = ({ items }) => {
  return (
    <List
      sx={{
        p: 0,
      }}
    >
      {items.map((item, index: number) => {
        return <Item key={item.key} index={index} item={item} />;
      })}
    </List>
  );
};

export default KeyValueViewer;

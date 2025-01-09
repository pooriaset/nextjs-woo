import Dialog from '@/components/Dialog/Dialog';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import { sortOptions } from '@/static/sortOptions';
import { SearchPageParamsKeys } from '@/utils/params';
import { SortOutlined } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const SortButton = () => {
  const t = useTranslations();
  const { sort, navigate } = useSearchPageParams();
  const [sortDialog, setSortDialog] = useState(false);

  const onOpenSortDialog = () => {
    setSortDialog(true);
  };

  const onCloseSortDialog = () => {
    setSortDialog(false);
  };

  const onSortChange: RadioGroupProps['onChange'] = (_event, value: string) => {
    onCloseSortDialog();
    navigate(SearchPageParamsKeys.Sort, value);
  };

  const selectedSort = sortOptions.find((item) => item.key === sort);

  return (
    <>
      <Dialog
        key={sort}
        open={sortDialog}
        onClose={onCloseSortDialog}
        title={t('products.sort.title')}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="sort-radio-buttons-group-label"
            value={sort}
            onChange={onSortChange}
          >
            {sortOptions.map((option) => {
              return (
                <FormControlLabel
                  key={option.label}
                  value={option.key}
                  control={<Radio />}
                  label={t(option.label)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Dialog>

      <Button
        color="inherit"
        variant="outlined"
        size="small"
        endIcon={<SortOutlined />}
        onClick={onOpenSortDialog}
      >
        {t(selectedSort?.label || sortOptions[0].label)}
      </Button>
    </>
  );
};

export default SortButton;

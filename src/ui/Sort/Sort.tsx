import { SortSharp } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { Select } from 'ui/Select/Select';
import { useClasses } from 'hooks';
import { styles } from './Sort.style';

interface Props {
  onSortUpdate: (option: SortOption) => void;
  sortBy:  number;
}

export enum SortOption {
  UNSELECTED = 0,
  PRICE_ASC = 1,
  PRICE_DESC = 2,
  TOKEN_ID_ASC = 3,
  TOKEN_ID_DESC = 4,
}

export const Sort = ({ onSortUpdate, sortBy }: Props) => {
  const { sortElement} = useClasses(styles);
  const handleApplySort = (event:any) => {
    onSortUpdate(event.target.value as SortOption);
  };

  return (
    <Select
      className={sortElement}
      variant="outlined"
      color="primary"
      IconComponent={SortSharp}
      defaultValue={sortBy}
      inputProps={{
        name: 'sort',
        id: 'uncontrolled-native',
      }}
      onChange={handleApplySort}
    >
      <MenuItem value={SortOption.PRICE_ASC}>Price ascending</MenuItem>
      <MenuItem value={SortOption.PRICE_DESC}>Price descending</MenuItem>
      <MenuItem value={SortOption.TOKEN_ID_ASC}>Token ID ascending</MenuItem>
      <MenuItem value={SortOption.TOKEN_ID_DESC}>Token ID descending</MenuItem>
    </Select>
  );
};

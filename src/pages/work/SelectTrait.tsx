import { styled } from '@mui/material';
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export type TraitItem = {
  value: string;
  disabled: boolean;
};

const StyledInputLabel = styled(InputLabel)`
  background-color: #16121e;
  padding-right: 8px;
`;

type Props = {
  name: string;
  value: string;
  items?: TraitItem[];
  onChange: (name: string, value: string) => void;
};

const SelectTrait = React.memo(({ name, value, items, onChange }: Props) => {
  return (
    <FormControl fullWidth style={{ marginTop: '10px' }}>
      <StyledInputLabel id="demo-simple-select-label">{name}</StyledInputLabel>
      <Select
        value={value}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={(event) => onChange(name, event.target.value)}
      >
        <MenuItem value="-1" style={{ color: 'white' }}>
          None
        </MenuItem>
        {!!items &&
          items.map((trait, index) => (
            <MenuItem
              key={index}
              value={trait.value}
              style={{ color: 'white' }}
              disabled={trait.disabled}
            >
              {trait.value}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
});

export default SelectTrait;

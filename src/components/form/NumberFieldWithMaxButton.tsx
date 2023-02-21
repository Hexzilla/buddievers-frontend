import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { appStyles } from '../../app.styles';
import { styles } from './NumberFieldWithMaxButton.styles';
import { useClasses } from '../../hooks';

export const NumberFieldWithMaxButton = (props: any) => {
  const fieldType = props.type || 'number';
  const setMaxValue = props.setMaxValue;
  const value = props.value ?? undefined;
  const setValue = props.setValue;

  const { formMaxButton } = useClasses(appStyles);
  const { outlinedInput } = useClasses(styles);

  const _setMaxNumber = () => {
    setMaxValue?.();
  };

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <FormControl className={props.className} variant="outlined">
        <OutlinedInput
          id={props.id}
          type={fieldType}
          className={outlinedInput}
          inputProps={{ min: 0 }}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <Button
                className={formMaxButton}
                onClick={() => {
                  _setMaxNumber();
                }}
              >
                MAX
              </Button>
            </InputAdornment>
          }
          value={value}
        />
      </FormControl>
    </React.Fragment>
  );
};

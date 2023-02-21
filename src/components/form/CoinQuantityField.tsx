import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import { appStyles } from '../../app.styles';
import { CoinQuantityFieldStyles } from './CoinQuantityField.styles';
import { useClasses } from '../../hooks';

export enum UNIT {
  ETHER = 1,
  WEI = 2,
}

export const CoinQuantityField = (props: any) => {
  const value: string = props.value ?? undefined;
  const setValue = props.setValue;
  const setMaxValue = props.setMaxValue;
  const withMaxButton = props.withMaxButton ?? false;

  const { formMaxButton } = useClasses(appStyles);
  const { outlinedInput } = useClasses(CoinQuantityFieldStyles);

  const _setMaxNumber = () => {
    setMaxValue?.();
  };

  const onValueChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl className={props.className} variant="outlined">
        <OutlinedInput
          id={props.id}
          type="text"
          className={outlinedInput}
          onChange={onValueChange}
          value={value}
          endAdornment={
            withMaxButton ? (
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
            ) : (
              ''
            )
          }
        />
      </FormControl>
    </>
  );
};

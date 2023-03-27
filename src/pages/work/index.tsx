import { useState, useMemo } from 'react';
import { useClasses } from 'hooks';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { groupUrls, StringObject, traits } from '../moonbuilder/config';
import MoonModel from '../moonbuilder/MoonModel';
import { styles } from './styles';

const Work = () => {
  const { container, formControlStyle } = useClasses(styles);
  const [values, setValues] = useState<StringObject>({
    bodies: '-1',
    tops: '-1',
    pants: '-1',
    suits: '-1',
    hair: '-1',
    eyewear: '-1',
    facewear: '-1',
    items: '-1',
    footwear: '-1',
    headwear: '-1',
    transcended: '-1',
  });

  const paths = useMemo((): string[] => {
    const keys = Object.keys(values);
    return keys
      .filter((key) => values[key] !== '-1')
      .map((key) => groupUrls[key] + values[key]);
  }, [values]);

  const handleValueChange = (name: string, value: string) => {
    console.log('handleValueChange', name, value);

    const update_values = { ...values, [name]: value };

    if (name === 'suits') {
      // If adding ‘suit’ remove pants and top
      update_values['tops'] = '-1';
      update_values['pants'] = '-1';
    } else if (name === 'tops' || name === 'pants') {
      // If suit and adding pants or top, remove suit
      update_values['suits'] = '-1';
    } else if (name === 'headwear') {
      // If adding ‘headwear’, remove ‘hair’
      update_values['hair'] = '-1';
    } else if (name === 'hair') {
      // If adding ‘hair’ remove ‘headwear’
      update_values['headwear'] = '-1';
    }

    if (name === 'tops') {
      if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
        update_values['hair'] = '-1';
        update_values['headwear'] = '-1';
      }
    } else if (name === 'hair' || name === 'headwear') {
      const tops = update_values['tops'];
      if (tops === 'Cyber Hoodie White' || tops === 'Cyber Hoodie Green') {
        update_values['tops'] = '-1';
      }
    } else if (name === 'headwear') {
    }

    console.log('update_values', update_values);
    setValues(update_values);
  };

  const optionView = (trait: StringObject) => {
    return Object.keys(trait).map((trait_name: string, index: number) => (
      <MenuItem
        key={index}
        value={trait[trait_name]}
        style={{ color: 'white' }}
      >
        {trait_name}
      </MenuItem>
    ));
  };

  console.log('values', values['Body'], values, Object.keys(traits));

  const itemSelect = Object.keys(traits).map(
    (_name: string, _index: number) => (
      <FormControl fullWidth key={_name} className={formControlStyle}>
        <InputLabel id="demo-simple-select-label">{_name}</InputLabel>
        <Select
          value={values[_name]}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(event) => handleValueChange(_name, event.target.value)}
        >
          <MenuItem value="-1" style={{ color: 'white' }}>
            None
          </MenuItem>
          {optionView(traits[_name])}
        </Select>
      </FormControl>
    )
  );

  return (
    <div className={container}>
      <Grid container>
        <Grid item sm={4} md={4}>
          {itemSelect}
        </Grid>
        <Grid item sm={8} md={8}>
          <MoonModel paths={paths} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Work;

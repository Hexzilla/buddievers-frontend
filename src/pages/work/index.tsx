import { useState, useMemo } from 'react';
import { useClasses } from 'hooks';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Button } from 'ui';
import { groupUrls, StringObject, traits } from '../moonbuilder/config';
import MoonModel from '../moonbuilder/MoonModel';
import { styles } from './styles';

const None = '-1';

console.log('traits, ', traits);

const Work = () => {
  const { container, formControlStyle, resetButtonStyle } = useClasses(styles);
  const [values, setValues] = useState<StringObject>({
    Body: None,
    Top: None,
    Pants: None,
    Suit: None,
    Hair: None,
    Eyewear: None,
    Facewear: None,
    Item: None,
    Footwear: None,
    Headwear: None,
    Transcended: None,
  });

  const paths = useMemo((): string[] => {
    return Object.keys(values)
      .filter((key) => values[key] !== None)
      .map((key) => groupUrls[key] + traits[key][values[key]]);
  }, [values]);

  const handleValueChange = (name: string, value: string) => {
    const update_values = { ...values, [name]: value };

    if (name === 'Suit') {
      update_values['Top'] = None;
      update_values['Pants'] = None;
    } else if (name === 'Top' || name === 'Pants') {
      update_values['Suit'] = None;
    }

    if (name === 'Headwear') {
      update_values['Hair'] = None;
    } else if (name === 'Hair') {
      update_values['Headwear'] = None;
    }

    if (name === 'Top') {
      if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
        update_values['Hair'] = None;
        update_values['Headwear'] = None;
      }
    } else if (name === 'Hair' || name === 'Headwear') {
      const top = update_values['Top'];
      if (top === 'Cyber Hoodie White' || top === 'Cyber Hoodie Green') {
        update_values['Top'] = None;
      }
    }

    if (name === 'Headwear') {
      if (
        value === 'Cyber Helmet' ||
        value === 'Rebel Helmet' ||
        value === 'Punk Helmet'
      ) {
        update_values['Footwear'] = None;
      }
    } else if (name === 'Footwear') {
      const headwear = update_values['Headwear'];
      if (
        headwear === 'Cyber Helmet' ||
        headwear === 'Rebel Helmet' ||
        headwear === 'Punk Helmet'
      ) {
        update_values['Headwear'] = '';
      }
    }

    if (name === 'Body' && value === 'Squid') {
      update_values['Facewear'] = None;
      if (update_values['Headwear'] === 'Punk Helmet') {
        update_values['Headwear'] = None;
      }
    }

    if (name === 'Transcended') {
      for (let key of Object.keys(update_values)) {
        if (key !== name) update_values[key] = None;
      }
    }

    setValues(update_values);
  };

  const checkDisabled = (name: string, value: string) => {
    if (values['Body'].startsWith('squid')) {
      if (name === 'Headwear' && value === 'Punk Helmet') {
        return true;
      }
      if (name === 'Facewear') {
        return true;
      }
    }
    return false;
  };

  const optionView = (_name: string) => {
    const trait = traits[_name];
    return Object.keys(trait).map((trait_name: string, index: number) => (
      <MenuItem
        key={index}
        value={trait_name}
        style={{ color: 'white' }}
        disabled={checkDisabled(_name, trait_name)}
      >
        {trait_name}
      </MenuItem>
    ));
  };

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
          {optionView(_name)}
        </Select>
      </FormControl>
    )
  );

  const onReset = () => {
    for (let key of Object.keys(values)) {
      values[key] = None;
    }
    setValues({ ...values });
  };

  console.log('paths', paths);
  return (
    <div className={container}>
      <Grid container>
        <Grid item sm={4} md={4}>
          <Button onClick={onReset} variant="contained" className={resetButtonStyle}>Reset Items</Button>
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

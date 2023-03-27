import { useState, useMemo } from 'react';
import { useClasses } from 'hooks';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { groupUrls, StringObject, traits } from '../moonbuilder/config';
import MoonModel from '../moonbuilder/MoonModel';
import { styles } from './styles';

const NONE = '-1';

console.log('traits, ', traits)

const Work = () => {
  const { container, formControlStyle } = useClasses(styles);
  const [values, setValues] = useState<StringObject>({
    Body: NONE,
    Top: NONE,
    Pants: NONE,
    Suit: NONE,
    Hair: NONE,
    Eyewear: NONE,
    Facewear: NONE,
    Item: NONE,
    Footwear: NONE,
    Headwear: NONE,
    Transcended: NONE,
  });

  const paths = useMemo((): string[] => {
    const keys = Object.keys(values);
    return keys
      .filter((key) => values[key] !== NONE)
      .map((key) => groupUrls[key] + traits[key][values[key]]);
  }, [values]);

  const handleValueChange = (name: string, value: string) => {
    const update_values = { ...values, [name]: value };

    if (name === 'Suit') {
      update_values['Top'] = NONE;
      update_values['Pants'] = NONE;
    } else if (name === 'Top' || name === 'Pants') {
      update_values['Suit'] = NONE;
    }
    
    if (name === 'Headwear') {
      update_values['Hair'] = NONE;
    } else if (name === 'Hair') {
      update_values['Headwear'] = NONE;
    }

    if (name === 'Top') {
      if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
        update_values['Hair'] = NONE;
        update_values['Headwear'] = NONE;
      }
    } else if (name === 'Hair' || name === 'Headwear') {
      const top = update_values['Top'];
      if (top === 'Cyber Hoodie White' || top === 'Cyber Hoodie Green') {
        update_values['Top'] = NONE;
      }
    }
    
    if (name === 'Headwear') {
      if (value === 'Cyber Helmet' || value === 'Rebel Helmet' || value === 'Punk Helmet') {
        update_values['Footwear'] = NONE;
      }
    } else if (name === 'Footwear') {
      const headwear = update_values['Headwear'];
      if (headwear === 'Cyber Helmet' || headwear === 'Rebel Helmet' || headwear === 'Punk Helmet') {
        update_values['Headwear'] = '';
      }
    }

    if (name === 'Body' && value === 'Squid') {
      update_values['Facewear'] = NONE;
      if (update_values['Headwear'] === 'Punk Helmet') {
        update_values['Headwear'] = NONE;
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
  }

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

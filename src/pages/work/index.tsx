import styled from '@emotion/styled';
import { useState, useMemo, useCallback } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { Button } from 'ui';
import { groupUrls, StringObject, traits } from '../moonbuilder/config';
import MoonModel from '../moonbuilder/MoonModel';
import useOwnedTokens from '../moonbuilder/myNFTs/useOwnedTokens';
import { Attributes } from '../moonbuilder/types';
import SelectTrait, { TraitItem } from './SelectTrait';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin-top: 120px;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  background: #16121e;

  @media (max-width: 768px) {
    margin-top: 100px;
  },
`;

const ResetButton = styled(Button)`
  font-size: 16px;
  background: #f5e2b2;
  height: 30px;
  color: #000;
  margin-top: 10px;
  border-radius: 10px;
`;

const None = '-1';

const Work = () => {
  const [traitNames, setTraitNames] = useState<string[]>([]);
  const [values, setValues] = useState<StringObject>({
    Body: None,
    Top: None,
    Pants: None,
    Suit: None,
    Hair: None,
    Item: None,
    Eyewear: None,
    Facewear: None,
    Footwear: None,
    Headwear: None,
    Transcended: None,
  });
  const ownedTokens = useOwnedTokens();

  const attributes = useMemo(() => {
    return ownedTokens.reduce((attributes, token) => {
      if (token.metadata?.attributes) {
        attributes.push(...token.metadata.attributes);
      }
      return attributes;
    }, [] as Attributes[]);
  }, [ownedTokens]);

  const paths = useMemo((): string[] => {
    const paths = traitNames
      .filter((key) => values[key] !== None)
      .map((key) => groupUrls[key] + traits[key][values[key]]);

    paths.splice(0, 0, '/resources/environment/stars.glb');
    return paths;
  }, [traitNames, values]);

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
        update_values['Facewear'] = None;
        update_values['Hair'] = None;
        update_values['Eyewear'] = None;
      }
    } else if (name === 'Facewear') {
      const headwear = update_values['Headwear'];
      if (
        headwear === 'Cyber Helmet' ||
        headwear === 'Rebel Helmet' ||
        headwear === 'Punk Helmet'
      ) {
        update_values['Headwear'] = None;
      }
    }

    if (name === 'Body' && value === 'Squid') {
      update_values['Facewear'] = None;
      if (update_values['Headwear'] === 'Punk Helmet') {
        update_values['Headwear'] = None;
      }
    }

    // if alien selected remove optics or scanner
    if (name === 'Body' && value === 'Alien') {
      if (
        update_values['Eyewear'] === 'Cyborg Optics' ||
        update_values['Eyewear'] === 'Biometric Scanner'
      ) {
        update_values['Eyewear'] = None;
      }
    }

    if (name === 'Transcended') {
      for (let key of Object.keys(update_values)) {
        if (key !== name) update_values[key] = None;
        console.log('paths', paths);
      }
    } else if (update_values['Transcended'] !== None) {
      update_values['Transcended'] = None;
    }

    setValues(update_values);

    /// The trait order is important for rendering.
    {
      const index = traitNames.indexOf(name);
      if (index >= 0) {
        traitNames.splice(index, 1);
      }
      traitNames.push(name);

      const updatedNames = [...traitNames];
      for (let key of traitNames) {
        if (update_values[key] === None) {
          const index = updatedNames.indexOf(key);
          updatedNames.splice(index, 1);
        }
      }

      console.log('updatedNames', updatedNames);
      setTraitNames(updatedNames);
    }
  };

  const checkDisabled = (name: string, value: string) => {
    if (values['Body'].startsWith('Squid')) {
      if (name === 'Headwear' && value === 'Punk Helmet') {
        return true;
      }
      if (name === 'Facewear') {
        return true;
      }
    }

    // disable cyborg optic and biometric scanner if alien
    if (values['Body'].startsWith('Alien')) {
      if (name === 'Eyewear' && value === 'Cyborg Optic') {
        return true;
      }
      if (name === 'Eyewear' && value === 'Biometric Scanner') {
        return true;
      }
    }

    // disable eyewear if wearing helmets
    if (
      values['Headwear'].startsWith('Cyber Helmet') ||
      values['Headwear'].startsWith('Punk Helmet') ||
      values['Headwear'].startsWith('Rebel Helmet')
    ) {
      if (name === 'Eyewear') {
        return true;
      }
    }
    return false;
  };

  const optionView = (_name: string) => {
    const trait = traits[_name];
    return Object.keys(trait)
      .filter((trait_name) =>
        attributes.find(
          (attr) => attr.traitType === _name && attr.value === trait_name
        )
      )
      .map((trait_name: string, index: number) => (
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

  /*const itemSelect = Object.keys(traits).map(
    (_name: string, _index: number) => (
      <FormControl fullWidth key={_name} style={{ marginTop: '10px' }}>
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
  );*/

  const onChange = useCallback((name: string, value: string) => {
    console.log('onChange', name, value);
    setValues((values) => {
      values[name] = value;
      return { ...values };
    });
  }, []);

  const optionItems = useMemo(() => {
    return [
      {
        value: 'Text',
        disabled: false,
      },
    ];
  }, []);

  const itemSelect = Object.keys(traits).map(
    (_name: string, _index: number) => (
      <SelectTrait
        key={_index}
        name={_name}
        value={values[_name]}
        items={optionItems}
        onChange={onChange}
      ></SelectTrait>
    )
  );

  const onReset = () => {
    for (let key of Object.keys(values)) {
      values[key] = None;
    }
    setValues({ ...values });
  };

  // console.log('paths', paths);
  return (
    <Container>
      <Grid container direction={isMobile ? 'column-reverse' : 'row'}>
        <Grid item xs={12} sm={4} md={4}>
          {itemSelect}
          <ResetButton onClick={onReset} variant="contained">
            Reset Items
          </ResetButton>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <MoonModel paths={paths} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Work;

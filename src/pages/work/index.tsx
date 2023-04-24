import styled from '@emotion/styled';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Grid } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { Button } from 'ui';
import { groupUrls, StringObject, traits } from '../moonbuilder/config';
import MoonModel from '../moonbuilder/MoonModel';
import useOwnedTokens from '../../hooks/useOwnedTokens';
import { Attributes } from '../../components/types';
import SelectTrait, { TraitItem } from './SelectTrait';
import { OwnedToken } from 'pages/marketbuddies/types';
import { useActiveWeb3React } from 'hooks';

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
    height : auto;
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
type OwnedTraitItem = Record<string, Array<TraitItem>>;

const checkDisabled = (values: StringObject, name: string, value: string) => {
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

const updateSelectValues = (
  values: StringObject,
  name: string,
  value: string
) => {
  if (name === 'Suit') {
    values['Top'] = None;
    values['Pants'] = None;
  } else if (name === 'Top' || name === 'Pants') {
    values['Suit'] = None;
  }

  if (name === 'Headwear') {
    values['Hair'] = None;
  } else if (name === 'Hair') {
    values['Headwear'] = None;
  }

  if (name === 'Top') {
    if (value === 'Cyber Hoodie White' || value === 'Cyber Hoodie Green') {
      values['Hair'] = None;
      values['Headwear'] = None;
    }
  } else if (name === 'Hair' || name === 'Headwear') {
    const top = values['Top'];
    if (top === 'Cyber Hoodie White' || top === 'Cyber Hoodie Green') {
      values['Top'] = None;
    }
  }

  if (name === 'Headwear') {
    if (
      value === 'Cyber Helmet' ||
      value === 'Rebel Helmet' ||
      value === 'Punk Helmet'
    ) {
      values['Facewear'] = None;
      values['Hair'] = None;
      values['Eyewear'] = None;
    }
  } else if (name === 'Facewear') {
    const headwear = values['Headwear'];
    if (
      headwear === 'Cyber Helmet' ||
      headwear === 'Rebel Helmet' ||
      headwear === 'Punk Helmet'
    ) {
      values['Headwear'] = None;
    }
  }

  if (name === 'Body' && value === 'Squid') {
    values['Facewear'] = None;
    if (values['Headwear'] === 'Punk Helmet') {
      values['Headwear'] = None;
    }
  }

  // if alien selected remove optics or scanner
  if (name === 'Body' && value === 'Alien') {
    if (
      values['Eyewear'] === 'Cyborg Optics' ||
      values['Eyewear'] === 'Biometric Scanner'
    ) {
      values['Eyewear'] = None;
    }
  }

  if (name === 'Transcended') {
    for (let key of Object.keys(values)) {
      if (key !== name) values[key] = None;
    }
  } else if (values['Transcended'] !== None) {
    values['Transcended'] = None;
  }

  return values;
};

const Work = () => {
  const [traitNames, setTraitNames] = useState<string[]>([]);
  const [ownedTraits, setOwnedTraits] = useState<OwnedTraitItem>({});
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
  const [ownedTokens, setOwnedTokens] = useState<OwnedToken[]>([]);
  const { account } = useActiveWeb3React();
  const getOwnedTokens = useOwnedTokens();

  useEffect(() => {
    if (account) {
      getOwnedTokens(account).then((tokens) => setOwnedTokens(tokens));
    }
  }, [account, getOwnedTokens]);

  const attributes = useMemo(() => {
    return ownedTokens.reduce((attributes, token) => {
      if (token.metadata?.attributes) {
        attributes.push(...token.metadata.attributes);
      }
      return attributes;
    }, [] as Attributes[]);
  }, [ownedTokens]);

  useEffect(() => {
    const traitItems: OwnedTraitItem = {};
    for (let attr of attributes) {
      if (attr.value !== 'False' && attr.value !== 'None') {
        const item: TraitItem = {
          value: attr.value,
          disabled: false,
        };
        const itemList = traitItems[attr.traitType];
        if (itemList) {
          const exists = itemList.find(i => i.value === item.value);
          !exists && itemList.push(item);
        } else {
          traitItems[attr.traitType] = [item];
        }
      }
    }
    setOwnedTraits(traitItems);
  }, [attributes]);

  useEffect(() => {
    setOwnedTraits((ownedTraits) => {
      let changed = false;
      for (let name of Object.keys(ownedTraits)) {
        const traitItems = ownedTraits[name];

        for (let trait of traitItems) {
          const disabled = checkDisabled(values, name, trait.value);
          if (trait.disabled !== disabled) {
            trait.disabled = disabled;
            ownedTraits[name] = [...traitItems];
            changed = true;
          }
        }
      }
      if (changed) {
        ownedTraits = { ...ownedTraits };
      }
      return ownedTraits;
    });
  }, [ownedTraits, values]);

  const onChangeValue = useCallback(
    (name: string, value: string) => {
      setValues((values) => {
        const updated = { ...values, [name]: value };
        const result = updateSelectValues(updated, name, value);
        return result;
      });

      setTraitNames((traitNames) => {
        const index = traitNames.indexOf(name);
        index >= 0 && traitNames.splice(index, 1);
        return [...traitNames, name];
      });
    },
    [setValues, setTraitNames]
  );

  useEffect(() => {
    setTraitNames((traitNames) => {
      let updatedNames = [...traitNames];
      for (let key of traitNames) {
        if (values[key] === None) {
          const index = updatedNames.indexOf(key);
          updatedNames.splice(index, 1);
        }
      }
      return updatedNames;
    });
  }, [values, setTraitNames]);

  const traitPaths = useMemo((): string[] => {
    const paths = traitNames
      .filter((key) => values[key] !== None)
      .map((key) => groupUrls[key] + traits[key][values[key]]);

    paths.splice(0, 0, '/resources/environment/stars.glb');
    return paths;
  }, [traitNames, values]);

  const itemSelect = useMemo(
    () =>
      Object.keys(traits).map((name: string, index: number) => (
        <SelectTrait
          key={index}
          name={name}
          value={values[name]}
          items={ownedTraits[name]}
          onChange={onChangeValue}
        ></SelectTrait>
      )),
    [values, ownedTraits, onChangeValue]
  );

  const onReset = useCallback(() => {
    setValues((values) => {
      for (let key of Object.keys(values)) {
        values[key] = None;
      }
      return { ...values };
    });
  }, []);

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
          <MoonModel paths={traitPaths} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Work;

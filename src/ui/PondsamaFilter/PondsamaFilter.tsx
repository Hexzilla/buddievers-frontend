import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterIcon from '@mui/icons-material/FilterListSharp';
import { Chip, Stack, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useClasses } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Drawer } from 'ui';
import {
  PONDSAMA_NATURE_TRAITS,
  PONDSAMA_PASSIVE_TRAITS,
  PONDSAMA_SkILL_TRAITS,
} from 'utils/constants';
import { OrderType, OwnedFilterType } from 'utils/subgraph';
import { styles } from './PondsamaFilter.style';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';

export interface PondsamaFilter {
  priceRange: number[];
  pondTraits: string[];
  selectedOrderType: OrderType | undefined;
  hpRange: number[];
  pwRange: number[];
  spRange: number[];
  dfRange: number[];
  owned: OwnedFilterType | undefined;
}

interface Props {
  onFiltersUpdate: (x: PondsamaFilter) => void;
}

export const PondsamaFilter = ({ onFiltersUpdate }: Props) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 2500]);
  const [hpRange, setHpRange] = useState<number[]>([1, 100]);
  const [pwRange, setPwRange] = useState<number[]>([1, 100]);
  const [spRange, setSpRange] = useState<number[]>([1, 100]);
  const [dfRange, setDfRange] = useState<number[]>([1, 100]);
  const [selectedPondTraits, setSelectedPondTraits] = useState<string[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<
    OrderType | undefined
  >(undefined);
  const [selectedOwnedType, setSelectedOwnedType] = useState<
    OwnedFilterType | undefined
  >(undefined);
  const {
    filtersDrawerContent,
    applyFiltersButton,
    filterAccordion,
    accordionHeader,
    accordionContent,
    filterChip,
    priceInput,
    filtersTitle
  } = useClasses(styles);

  const [searchParams] = useSearchParams();
  const { account } = useActiveWeb3React();
  const filter = searchParams.get('filter') ?? '';
  useEffect(() => {
    if (filter.length >= 1) {
      let newFilter: PondsamaFilter = JSON.parse(filter);
      setSelectedOrderType(newFilter?.selectedOrderType);
      setPriceRange(newFilter?.priceRange);
      setHpRange(newFilter?.hpRange);
      setPwRange(newFilter?.pwRange);
      setSpRange(newFilter?.spRange);
      setDfRange(newFilter?.dfRange);
      setSelectedOwnedType(newFilter?.owned);
      setSelectedPondTraits(newFilter?.pondTraits);
    }
  }, []);

  const handleApplyFilters = () => {
    onFiltersUpdate({
      selectedOrderType,
      pondTraits: selectedPondTraits,
      priceRange,
      hpRange,
      pwRange,
      spRange,
      dfRange,
      owned: selectedOwnedType,
    });
    setIsDrawerOpened(false);
  };

  const handlePriceRangeChange2 = (event: any, to: boolean) => {
    // console.log(event.target.value);
    if (!event.target.value && event.target.value !== 0) {
      return;
    }
    const val = Number.parseFloat(event.target.value);
    if (!val && val !== 0) {
      return;
    }
    const newRange = to ? [priceRange[0], val] : [val, priceRange[1]];
    if (JSON.stringify(newRange) !== JSON.stringify(priceRange)) {
      setPriceRange(newRange);
    }
  };

  const handleHpRangeChange = (event: any, to: boolean) => {
    if (!event.target.value && event.target.value !== 0) {
      return;
    }
    const val = Number.parseFloat(event.target.value);
    if (!val && val !== 0) {
      return;
    }
    const newRange = to ? [hpRange[0], val] : [val, hpRange[1]];
    if (JSON.stringify(newRange) !== JSON.stringify(hpRange)) {
      setHpRange(newRange);
    }
  };

  const handlePwRangeChange = (event: any, to: boolean) => {
    if (!event.target.value && event.target.value !== 0) {
      return;
    }
    const val = Number.parseFloat(event.target.value);
    if (!val && val !== 0) {
      return;
    }
    const newRange = to ? [pwRange[0], val] : [val, pwRange[1]];
    if (JSON.stringify(newRange) !== JSON.stringify(pwRange)) {
      setPwRange(newRange);
    }
  };

  const handleSpRangeChange = (event: any, to: boolean) => {
    if (!event.target.value && event.target.value !== 0) {
      return;
    }
    const val = Number.parseFloat(event.target.value);
    if (!val && val !== 0) {
      return;
    }
    const newRange = to ? [spRange[0], val] : [val, spRange[1]];
    if (JSON.stringify(newRange) !== JSON.stringify(spRange)) {
      setSpRange(newRange);
    }
  };

  const handleDfRangeChange = (event: any, to: boolean) => {
    if (!event.target.value && event.target.value !== 0) {
      return;
    }
    const val = Number.parseFloat(event.target.value);
    if (!val && val !== 0) {
      return;
    }
    const newRange = to ? [dfRange[0], val] : [val, dfRange[1]];
    if (JSON.stringify(newRange) !== JSON.stringify(dfRange)) {
      setDfRange(newRange);
    }
  };

  const handleOrderTypeClick = (orderType: OrderType | undefined) => {
    setSelectedOrderType(orderType);
  };

  const handleOwnedTypeClick = (owned: OwnedFilterType | undefined) => {
    setSelectedOwnedType(owned);
  };

  const handlePondTraitClick = (trait: string) => {
    if (selectedPondTraits.includes(trait)) {
      setSelectedPondTraits(
        selectedPondTraits.filter(
          (selectedPondTrait) => selectedPondTrait !== trait
        )
      );
      return;
    }
    setSelectedPondTraits([...selectedPondTraits, trait]);
  };

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpened(true)}
        startIcon={<FilterIcon />}
        variant="outlined"
        color="primary"
      >
        Filter
      </Button>
      <Drawer
        anchor="left"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        onOpen={() => setIsDrawerOpened(true)}
        onBackdropClick={() => setIsDrawerOpened(false)}
      >
        <Typography variant="h6" className={filtersTitle}>
          Filters
        </Typography>
        <Stack className={filtersDrawerContent}>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={accordionHeader}>Order Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={accordionContent}>
                <Chip
                  label="Active buy order"
                  variant="outlined"
                  onClick={() => handleOrderTypeClick(OrderType.BUY)}
                  className={`${filterChip} ${
                    selectedOrderType === OrderType.BUY && 'selected'
                  }`}
                />
                <Chip
                  label="Active sell order"
                  variant="outlined"
                  onClick={() => handleOrderTypeClick(OrderType.SELL)}
                  className={`${filterChip} ${
                    selectedOrderType === OrderType.SELL && 'selected'
                  }`}
                />
                <Chip
                  label="None"
                  variant="outlined"
                  onClick={() => handleOrderTypeClick(undefined)}
                  className={`${filterChip} ${
                    selectedOrderType === undefined && 'selected'
                  }`}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={accordionHeader}>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 8 }}
                justifyContent="flex-end"
                alignItems="center"
              >
                <TextField
                  className={priceInput}
                  placeholder="Min"
                  variant="outlined"
                  onChange={(event: any) =>
                    handlePriceRangeChange2(event, false)
                  }
                  defaultValue={priceRange[0]}
                />
                <div>TO</div>
                <TextField
                  className={priceInput}
                  placeholder="Max"
                  variant="outlined"
                  onChange={(event: any) =>
                    handlePriceRangeChange2(event, true)
                  }
                  defaultValue={priceRange[1]}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={accordionHeader}>Owned</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {account ? (
                <div className={accordionContent}>
                  <Chip
                    label="Owned"
                    variant="outlined"
                    onClick={() => handleOwnedTypeClick(OwnedFilterType.OWNED)}
                    className={`${filterChip} ${
                      selectedOwnedType === OwnedFilterType.OWNED && 'selected'
                    }`}
                  />
                  <Chip
                    label="Not OWned"
                    variant="outlined"
                    onClick={() =>
                      handleOwnedTypeClick(OwnedFilterType.NOTOWNED)
                    }
                    className={`${filterChip} ${
                      selectedOwnedType === OwnedFilterType.NOTOWNED &&
                      'selected'
                    }`}
                  />
                  <Chip
                    label="All"
                    variant="outlined"
                    onClick={() => handleOwnedTypeClick(OwnedFilterType.All)}
                    className={`${filterChip} ${
                      selectedOwnedType === OwnedFilterType.All && 'selected'
                    }`}
                  />
                </div>
              ) : (
                <div className={accordionContent}>
                  <Typography className={accordionHeader}>
                    Please connect your wallet!
                  </Typography>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={accordionHeader}>Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={accordionContent}>
                <Chip
                  label="Neon"
                  variant="outlined"
                  onClick={() => handlePondTraitClick('Neon')}
                  className={`${filterChip} ${
                    selectedPondTraits.includes('Neon') && 'selected'
                  }`}
                />
                <Chip
                  label="Organic"
                  variant="outlined"
                  onClick={() => handlePondTraitClick('Organic')}
                  className={`${filterChip} ${
                    selectedPondTraits.includes('Organic') && 'selected'
                  }`}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={accordionHeader}>Breed</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={accordionContent}>
                <Chip
                  label="Spelly"
                  variant="outlined"
                  onClick={() => handlePondTraitClick('Spelly')}
                  className={`${filterChip} ${
                    selectedPondTraits.includes('Spelly') && 'selected'
                  }`}
                />
                <Chip
                  label="Nimbus"
                  variant="outlined"
                  onClick={() => handlePondTraitClick('Nimbus')}
                  className={`${filterChip} ${
                    selectedPondTraits.includes('Nimbus') && 'selected'
                  }`}
                />
                <Chip
                  label="Bambo"
                  variant="outlined"
                  onClick={() => handlePondTraitClick('Bambo')}
                  className={`${filterChip} ${
                    selectedPondTraits.includes('Bambo') && 'selected'
                  }`}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={accordionHeader}>Attributes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                className={accordionContent}
                direction={{ xs: 'column' }}
                spacing={{ xs: 1 }}
                justifyContent="flex-start"
                alignItems="strech"
              >
                <Typography className={accordionHeader}>HP Range</Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 8 }}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    className={priceInput}
                    placeholder="Min"
                    variant="outlined"
                    onChange={(event: any) => handleHpRangeChange(event, false)}
                    defaultValue={hpRange[0]}
                  />
                  <div>TO</div>
                  <TextField
                    className={priceInput}
                    placeholder="Max"
                    variant="outlined"
                    onChange={(event: any) => handleHpRangeChange(event, true)}
                    defaultValue={hpRange[1]}
                  />
                </Stack>

                <Typography className={accordionHeader}>PW Range</Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 8 }}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    className={priceInput}
                    placeholder="Min"
                    variant="outlined"
                    onChange={(event: any) => handlePwRangeChange(event, false)}
                    defaultValue={pwRange[0]}
                  />
                  <div>TO</div>
                  <TextField
                    className={priceInput}
                    placeholder="Max"
                    variant="outlined"
                    onChange={(event: any) => handlePwRangeChange(event, true)}
                    defaultValue={pwRange[1]}
                  />
                </Stack>

                <Typography className={accordionHeader}>SP Range</Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 8 }}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    className={priceInput}
                    placeholder="Min"
                    variant="outlined"
                    onChange={(event: any) => handleSpRangeChange(event, false)}
                    defaultValue={spRange[0]}
                  />
                  <div>TO</div>
                  <TextField
                    className={priceInput}
                    placeholder="Max"
                    variant="outlined"
                    onChange={(event: any) => handleSpRangeChange(event, true)}
                    defaultValue={spRange[1]}
                  />
                </Stack>

                <Typography className={accordionHeader}>DF Range</Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 8 }}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TextField
                    className={priceInput}
                    placeholder="Min"
                    variant="outlined"
                    onChange={(event: any) => handleDfRangeChange(event, false)}
                    defaultValue={dfRange[0]}
                  />
                  <div>TO</div>
                  <TextField
                    className={priceInput}
                    placeholder="Max"
                    variant="outlined"
                    onChange={(event: any) => handleDfRangeChange(event, true)}
                    defaultValue={dfRange[1]}
                  />
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={accordionHeader}>Nature</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={accordionContent}>
                {Object.keys(PONDSAMA_NATURE_TRAITS).map((trait, i) => (
                  <Chip
                    label={trait}
                    key={`${trait}-${i}`}
                    variant="outlined"
                    onClick={() => handlePondTraitClick(trait)}
                    className={`${filterChip} ${
                      selectedPondTraits.includes(trait) && 'selected'
                    }`}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={accordionHeader}>
                Passive Ability
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={accordionContent}>
                {Object.keys(PONDSAMA_PASSIVE_TRAITS).map((trait, i) => (
                  <Chip
                    label={trait}
                    key={`${trait}-${i}`}
                    variant="outlined"
                    onClick={() => handlePondTraitClick(trait)}
                    className={`${filterChip} ${
                      selectedPondTraits.includes(trait) && 'selected'
                    }`}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded square className={filterAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={accordionHeader}>Skill</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={accordionContent}>
                {Object.keys(PONDSAMA_SkILL_TRAITS).map((trait, i) => (
                  <Chip
                    label={trait}
                    key={`${trait}-${i}`}
                    variant="outlined"
                    onClick={() => handlePondTraitClick(trait)}
                    className={`${filterChip} ${
                      selectedPondTraits.includes(trait) && 'selected'
                    }`}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Button
            className={applyFiltersButton}
            onClick={handleApplyFilters}
            variant="contained"
            color="primary"
          >
            Apply Filters
          </Button>
          <Button
            onClick={() => setIsDrawerOpened(false)}
            className={applyFiltersButton}
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

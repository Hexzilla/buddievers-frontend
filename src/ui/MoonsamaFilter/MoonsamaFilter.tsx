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
import { MOONSAMA_TRAITS } from 'utils/constants';
import { OrderType, OwnedFilterType } from 'utils/subgraph';
import { styles } from './MoonsamaFilter.style';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React/useActiveWeb3React';

export interface MoonsamaFilter {
  priceRange: number[];
  traits: string[];
  selectedOrderType: OrderType | undefined;
  owned: OwnedFilterType | undefined;
}

interface Props {
  onFiltersUpdate: (x: MoonsamaFilter) => void;
}

export const MoonsamaFilter = ({ onFiltersUpdate }: Props) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 2500]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
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
    filtersTitle,
  } = useClasses(styles);

  const { account } = useActiveWeb3React();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  useEffect(() => {
    if (filter.length >= 1) {
      let newFilter: MoonsamaFilter = JSON.parse(filter);
      setSelectedOrderType(newFilter?.selectedOrderType);
      setPriceRange(newFilter?.priceRange);
      setSelectedTraits(newFilter?.traits);
      setSelectedOwnedType(newFilter?.owned);
    }
  }, []);

  const handleApplyFilters = () => {
    onFiltersUpdate({
      selectedOrderType,
      traits: selectedTraits,
      priceRange,
      owned: selectedOwnedType,
    });
    setIsDrawerOpened(false);
  };

  const handlePriceRangeChange2 = (event: any, to: boolean) => {
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

  const handleOrderTypeClick = (orderType: OrderType | undefined) => {
    setSelectedOrderType(orderType);
  };

  const handleTraitClick = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(
        selectedTraits.filter((selectedTrait) => selectedTrait !== trait)
      );
      return;
    }
    setSelectedTraits([...selectedTraits, trait]);
  };

  const handleOwnedTypeClick = (owned: OwnedFilterType | undefined) => {
    setSelectedOwnedType(owned);
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
        <div className={filtersDrawerContent}>
          <div>
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
                      onClick={() =>
                        handleOwnedTypeClick(OwnedFilterType.OWNED)
                      }
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
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionHeader}>Traits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={accordionContent}>
                  {Object.keys(MOONSAMA_TRAITS).map((trait, i) => (
                    <Chip
                      label={trait}
                      key={`${trait}-${i}`}
                      variant="outlined"
                      onClick={() => handleTraitClick(trait)}
                      className={`${filterChip} ${
                        selectedTraits.includes(trait) && 'selected'
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
          </div>
        </div>
      </Drawer>
    </>
  );
};

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
import { OrderType } from 'utils/subgraph';
import { styles } from './Filters.style';

export interface Filters {
  priceRange: number[];
  selectedOrderType: OrderType | undefined;
}

interface Props {
  onFiltersUpdate: (x: Filters) => void;
}

export const Filters = ({ onFiltersUpdate }: Props) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 2500]);
  const [selectedOrderType, setSelectedOrderType] = useState<
    OrderType | undefined
  >(undefined);
  const {
    filtersDrawerContent,
    applyFiltersButton,
    filterAccordion,
    accordionHeader,
    accordionContent,
    filterChip,
    priceRangeWrapper,
    priceInput,
    filtersTitle,
  } = useClasses(styles);

  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  useEffect(() => {
    if (filter.length >= 1) {
      let newFilter: Filters = JSON.parse(filter);
      setSelectedOrderType(newFilter?.selectedOrderType);
      setPriceRange(newFilter?.priceRange);
    }
  }, []);

  const handleApplyFilters = () => {
    onFiltersUpdate({
      selectedOrderType,
      priceRange,
    });
    setIsDrawerOpened(false);
  };

  // const handlePriceRangeChange = (
  //   event: Event,
  //   newValue: number | number[]
  // ) => {
  //   console.log('click', newValue);
  //   setPriceRange(newValue as number[]);
  // };

  const handlePriceRangeChange2 = (event: any, to: boolean) => {
    if (!event.target.value && event.target.value !== 0) {
      return;
    }

    const val = Number.parseFloat(event.target.value);

    if (!val && val !== 0) {
      return;
    }

    const newRange = to ? [priceRange[0], val] : [val, priceRange[1]];

    console.log('click', newRange);

    if (JSON.stringify(newRange) !== JSON.stringify(priceRange)) {
      setPriceRange(newRange);
    }
  };

  const handleOrderTypeClick = (orderType: OrderType | undefined) => {
    setSelectedOrderType(orderType);
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
                {/*
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  sx={{
                    "& .MuiSlider-thumb":{
                      color: "#710021",
                    },
                    "& .MuiSlider-track": {
                      color: '#710021'
                    },
                    "& .MuiSlider-rail": {
                      color: '#c5c5c5'
                    }
                  }}
                />
                <div className={priceRangeWrapper}>
                  <div>{`${priceRange[0]} MOVR`}</div>
                  <div>{`${priceRange[1]} MOVR`}</div>
                </div>
                */}
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

import { Tab, Tabs as MaterialTabs } from '@mui/material';
import { useClasses } from 'hooks';
import React, { Fragment, ReactNode } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { styles } from './Tabs.styles';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

type TabsProps = {
  tabs: { label: string; view: ReactNode }[];
  containerClassName?: string;
  tabsClassName?: string;
  currentTab?: number ;
  onTabChanged?: Function;
};

export const Tabs = ({
  tabs,
  containerClassName,
  tabsClassName,
  currentTab,
  onTabChanged
}: TabsProps) => {
  const { tab, tabsStyles, selected } = useClasses(styles);

  const handleChange = (event: unknown, newValue: number) => {
    if (typeof onTabChanged === 'function') {
      onTabChanged(newValue);
    }
  };

  const handleChangeIndex = (index: number) => {
    if (typeof onTabChanged === 'function') {
      onTabChanged(index);
    }
  };

  return (
    <div className={containerClassName}>
      <MaterialTabs
        className={`${tabsStyles} ${tabsClassName || ''}`}
        value={currentTab}
        onChange={handleChange}
        variant="standard"
        TabIndicatorProps={{
          style: {
            display: 'none',
            width: 0,
            height: 0,
          },
        }}
      >
        {tabs.map(({ label }) => (
          <Tab
            key={label}
            classes={{ selected }}
            disableRipple
            className={tab}
            label={label}
            {...a11yProps(1)}
          />
        ))}
      </MaterialTabs>
      <SwipeableViews index={currentTab} onChangeIndex={handleChangeIndex}>
        {tabs.map(({ view }, index) => (
          <Fragment key={index}>{view}</Fragment>
        ))}
      </SwipeableViews>
    </div>
  );
};

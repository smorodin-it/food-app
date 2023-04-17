import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { useState } from 'react';
import { TabsContainerProps } from './types';

export function TabsContainer(props: TabsContainerProps): JSX.Element {
  const [value, setValue] = useState(props.tabKey ? props.tabKey : '1');

  const tabItems = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={props.className}>
      <TabContext value={value}>
        <Box>
          {props.titleBlock}
          <TabList onChange={handleChange}>
            {tabItems.map((item, key) => {
              return (
                <Tab
                  label={item.props.title}
                  value={String(key + 1)}
                  key={key}
                />
              );
            })}
          </TabList>
        </Box>
        <Grid container spacing={props.spacingGrid}>
          <Grid
            item
            xs={props.xsSideBar ? 12 - props.xsSideBar : 12}
            sm={props.smSideBar ? 12 - props.smSideBar : 12}
            md={props.mdSideBar ? 12 - props.mdSideBar : 12}
          >
            {tabItems.map((item, key) => {
              return (
                <TabPanel
                  className={item.props.className}
                  value={String(key + 1)}
                  key={key}
                >
                  {item.props.children}
                </TabPanel>
              );
            })}
          </Grid>
          <Grid
            item
            xs={props.xsSideBar}
            sm={props.smSideBar}
            md={props.mdSideBar}
          >
            {props.sideBarBlock}
          </Grid>
        </Grid>
      </TabContext>
    </div>
  );
}

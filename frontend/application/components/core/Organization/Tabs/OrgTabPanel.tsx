import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabsStatus from './TabsStatus';
import TabsSettings from './TabsSettings';
import TabsDefault from './TabsDefault';
import TabsShop from './TabsShop';
import TabsUsers from './TabsUsers';
import TabsMenu from "./TabsMenu";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OrgTabPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Статусы" {...a11yProps(0)} />
          <Tab label="Настройки точки" {...a11yProps(1)} />
          <Tab label="Общее " {...a11yProps(2)} />
					<Tab label="Магазин" {...a11yProps(3)} />
					<Tab label="Пользователи" {...a11yProps(4)} />
					<Tab label="Меню блюд" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabsStatus />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabsSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabsDefault />
      </TabPanel>
			<TabPanel value={value} index={3}>
        <TabsShop />
      </TabPanel>
			<TabPanel value={value} index={4}>
        <TabsUsers />
      </TabPanel>

        {/*Menu*/}
      <TabPanel value={value} index={5}>
        <TabsMenu />
      </TabPanel>
    </Box>
  );
}
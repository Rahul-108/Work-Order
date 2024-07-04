import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const packages = [
  { id: 'civil1', name: 'Civil 1', rate: 10, total: 100 },
  { id: 'civil2', name: 'Civil 2', rate: 20, total: 200 },
  { id: 'civil3', name: 'Civil 3', rate: 30, total: 300 },
  { id: 'civil4', name: 'Civil 4', rate: 40, total: 400 },
  { id: 'civil5', name: 'Civil 5', rate: 50, total: 500 },
];

const activities = [
  { id: 'activity1', name: 'Activity 1', workItems: ['WorkItem 1', 'WorkItem 2', 'WorkItem 3'] },
  { id: 'activity2', name: 'Activity 2', workItems: ['WorkItem 1', 'WorkItem 2', 'WorkItem 3'] },
  { id: 'activity3', name: 'Activity 3', workItems: ['WorkItem 1', 'WorkItem 2', 'WorkItem 3'] },
  { id: 'activity4', name: 'Activity 4', workItems: ['WorkItem 1', 'WorkItem 2', 'WorkItem 3'] },
  { id: 'activity5', name: 'Activity 5', workItems: ['WorkItem 1', 'WorkItem 2', 'WorkItem 3'] },
];

const WorkOrderComponent = () => {

  const [expanded, setExpanded] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const handleExpandCollapse = (id) => {
    setExpanded({ ...expanded, [id]: !expanded[id] });
  };

  const handleSelectItem = (id) => (event) => {
    setSelectedItems({ ...selectedItems, [id]: event.target.checked });
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="p-4">
      <Tabs value={activeTab} onChange={handleChangeTab} aria-label="work order tabs">
        <Tab label="Overview" />
        <Tab label="Other" />
      </Tabs>
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Packages</TableCell>
                <TableCell>Rate (in sqft)</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <React.Fragment key={pkg.id}>
                  <TableRow>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedItems[pkg.id] || false}
                            onChange={handleSelectItem(pkg.id)}
                          />
                        }
                        label={pkg.name}
                      />
                    </TableCell>
                    <TableCell>{pkg.rate}</TableCell>
                    <TableCell>{pkg.total}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleExpandCollapse(pkg.id)}>
                        {expanded[pkg.id] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                      <Collapse in={expanded[pkg.id]}>
                        <Box margin={5}>
                          {activities.map((activity) => (
                            <div key={activity.id} style={{ marginBottom: '10px' }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={selectedItems[`${pkg.id}+${activity.id}`] || false}
                                    onChange={handleSelectItem(`${pkg.id}+${activity.id}`)}
                                  />
                                }
                                label={activity.name}
                              />
                              <IconButton onClick={() => handleExpandCollapse(`${pkg.id}+${activity.id}`)}>
                                {expanded[`${pkg.id}+${activity.id}`] ? <ExpandLess /> : <ExpandMore />}
                              </IconButton>
                              <Collapse in={expanded[`${pkg.id}+${activity.id}`]}>
                                <Box marginLeft={5}>
                                  {activity.workItems.map((workItem, index) => (
                                    <div key={`${pkg.id}+${activity.id}+${index}`}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={selectedItems[`${pkg.id}+${activity.id}+${workItem}`] || false}
                                            onChange={handleSelectItem(`${pkg.id}+${activity.id}+${workItem}`)}
                                          />
                                        }
                                        label={workItem}
                                      />
                                    </div>
                                  ))}
                                </Box>
                              </Collapse>
                            </div>
                          ))}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {activeTab === 1 && (
        <div className="p-4">
          <h1>Hello World!</h1>
        </div>
      )}
    </div>
  );
};

export default WorkOrderComponent;

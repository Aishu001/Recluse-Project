import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import '../Style/Admin.css';

function Admin() {
  const [points, setPoints] = useState(10);
  const navigate = useNavigate(); // Use navigate to handle redirection

  const handlePointsChange = (e) => {
    setPoints(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.put('http://localhost:3000/account/editPointsValueByAdmin', { points },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Include token if required
        }
      });
      alert('Default points updated successfully');
    } catch (error) {
      console.error('Error updating points', error);
      alert('Failed to update points');
    }
  };

  const handleLogout = () => {
  
    navigate('/');
  };

  const drawerWidth = 240;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
              <ListItemText primary="Wallet Management" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>

          {/* Logout Button */}
          <Box sx={{ padding: '16px' }}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Admin Dashboard</h1>

          <div>
            <div className='Boc'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={4} className='boxv'>
                    <p>Sell</p>
                    <h1>3,321</h1>
                  </Grid>
                  <Grid size={4} className='boxv'>
                    <p>Customer</p>
                    <h1>33,321</h1>
                  </Grid>
                </Grid>
                <br />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={4} className='box'>
                    <p>online</p>
                    <h1>1,321</h1>
                  </Grid>
                  <Grid size={4} className='box'>
                    <p>offline</p>
                    <h1>2,321</h1>
                  </Grid>
                </Grid>
              </Box>
            </div>

            {/* Flex container for charts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '150px', marginLeft: '200px' }}>
              <div style={{ flex: 1, marginRight: '20px' }}>
                <BarChart
                  series={[
                    { data: [35, 44, 24, 34] },
                    { data: [51, 6, 49, 30] },
                    { data: [15, 25, 30, 50] },
                    { data: [60, 50, 15, 25] },
                  ]}
                  height={190}
                  xAxis={[{ data: ['online', 'sell', 'offline', 'refund'], scaleType: 'band' }]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'new product ' },
                        { id: 1, value: 15, label: 'Product' },
                        { id: 2, value: 20, label: 'Max Sell' },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>
            <div className='walletPoint'>
              <h1> Wallet Points</h1>
              <input
                type="number"
                value={points}
                onChange={handlePointsChange}
              />
              <button onClick={handleSubmit}>Update Points</button>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Admin;

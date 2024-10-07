import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for redirection
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import '../Style/UserAccount.css'

function UserAccount() {
  const [referenceID, setReferenceID] = useState(null);
  const [points, setPoints] = useState(null); // State for points
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/account/getReferenceIDAndWallet', {
          params: { userId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Include token if required
          }
        });
        setReferenceID(response.data.referenceID);
        setPoints(response.data.points);
      } catch (error) {
        console.error('Error fetching wallet info:', error);
      }
    };

    if (userId) {
      fetchWalletInfo();
    }
  }, [userId]);

  const generateReferenceID = async () => {
    const id = 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const authToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post('http://localhost:3000/account/createReferenceID', {
        referenceID: id,
        userId: userId,
      },{
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });

      if (response.status === 201) {
        console.log('Reference ID created and stored in DB:', response.data);
        setReferenceID(id);
      }
    } catch (error) {
      console.error('Error creating Reference ID:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email'); // Clear email
    localStorage.removeItem('referenceID'); // Clear reference ID, if set
    navigate('/');
    
  };

  return (
    <>
    <div className="cart-icon-container">
        <LogoutIcon onClick={handleLogout}/>
      </div>
      <h1 className='head'>Welcome to Your Account Profile!</h1>
      <p className='head1'> Your Reference Code: Your unique reference code is a powerful tool for growing your network and earning rewards.</p>
      <Box >
        <Grid container spacing={2} className='profileBox'>
          <Grid item xs={8} className="createReferenceID">
            {referenceID ? (
              <><div className="walletAmount-text-div">
<span className="walletAmount-textt">Your Refer Code</span>   

              </div>
              
              <p className="walletAmount-text"> {referenceID}</p></>
            ) : (
              <><><div className="walletAmount-text-div">
                  <span className="walletAmount-textt-new">Create Your Referal Code</span>
                
                </div>
                  </><Button
                    variant="contained"
                    onClick={generateReferenceID}
                    sx={{ backgroundColor: '#3f51b5', ':hover': { backgroundColor: '#303f9f' } ,marginTop: '80px', padding: '20px' }}
                  >
                    Create Code
                  </Button></>
            )}
          </Grid>
          <Grid item xs={4} className="walletAmount">
            {points !== null ? ( // Display points if availab
            <><div className="walletAmount-text-div">
              <span className="walletAmount-textt">Wallet</span>
              <img src="/public/giphy.gif" alt="Points animation" style={{ height: 104 }} />
            </div>
            <p className="walletAmount-text">$ {points}.00</p></>
            ) : (
              <><><div className="walletAmount-text-div">
                  <span className="walletAmount-textt">Wallet</span>
                  <img src="/public/giphy.gif" alt="Points animation" style={{ height: 104 }} />
                </div>
                  <p className="walletAmount-text">$ 0.00</p></></>
            )}
          </Grid>
          {/* <Grid item xs={12} className="logout">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default UserAccount;

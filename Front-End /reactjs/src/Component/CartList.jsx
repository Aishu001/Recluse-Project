import React from 'react';
import { useLocation , Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../Style/CartList.css'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


function CartList() {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  return (
    <>
      <div className="cart-icon-container-list">
        <p className="total-item-count1"> Check Out</p>
        <Link to="/viewProduct">
          <ArrowBackOutlinedIcon className="cart-icon" />
        </Link>
      </div>
      <div >
        <Grid container spacing={2} className="cart-list-containers">
  <Grid size={8} >
    <div className="cart-list-container1">
    {cartItems.map((item) => (
          <TableContainer >
          <Table    className="cart-item-card">
            <TableBody>         
                <TableRow
                 key={item.id}
                >
                 
                  <TableCell align="left"><img src={item.image} alt="" className="cart-list-img" /></TableCell>
                  <TableCell align="left" className="cart-list-text"> {item.title}</TableCell>
                  <TableCell align="right" className="cart-list-text">${item.price}</TableCell>   
                </TableRow>
          
            </TableBody>
          </Table>
        </TableContainer>
       
      ))}
    </div>
 
  </Grid>
  <Grid size={4} className="cart-list-container2">
  <div className="total-price">
    <div style={{ borderBottom: '2px solid grey' }}>
      <Link to="/paymentMode" state={{ totalPrice }}>
                  <button className="cart-btn">Continue to Payment</button>
                </Link>
    
    <p className="cart-text">By placing your order, you agree to Amazon's </p>    
    <p className="cart-text1"  >privacy notice and conditions of use.</p>
    </div>
   
    <h4 className="cart-textt2">Order Summary</h4>
    <table id="customers">
    <tr>
    <td>Total Price:</td>
    <td>${totalPrice.toFixed(2)}</td>
  </tr>
  <tr>
    <td>Delivery:</td>
    <td>$40.00</td>
  </tr>
  <tr>
    <td>Promotion Applied:</td>
    <td>-$40.00</td>
  </tr>
  
  </table>
    <p className="cart-texttt2">Total Price: ${totalPrice.toFixed(2)}</p>
    <div style={{ borderTop: '2px solid grey' }}>
    <p className="cart-textttt2">Your Savings: ₹ 340.00 (53%) </p>
     <ul className="cart-text1">
        <li>Free Delivery</li>
        <li>Free Return</li>
        <li>Item Discount</li>
     </ul>

    </div>
  
      
      </div>
  </Grid>
 
</Grid>

     
     
    </div></>
  
  );
}

export default CartList;

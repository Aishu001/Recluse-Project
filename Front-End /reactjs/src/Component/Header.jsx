
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../Style/Header.css';
import {  Link } from 'react-router-dom';

function Header() {
    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
          title: 'Bed',
        },
        {
          img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
          title: 'Books',
        },
        {
          img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
          title: 'Sink',
        },
        {
          img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
          title: 'Kitchen',
        },
        {
          img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
          title: 'Blinds',
        },
        {
          img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
          title: 'Chairs',
        },
        {
          img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
          title: 'Laptop',
        },
        {
          img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
          title: 'Doors',
        },
        {
          img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
          title: 'Storage',
        },
        {
          img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
          title: 'Candle',
        },
        {
          img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
          title: 'Coffee table',
        },
      ];

    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='LandingPage'>
                <Grid container spacing={2} >

                    <Grid size={8} >
                        <div className='Text'>
                        <p className='Text1'>Our Summer Collections</p>
                        <span className='Text2'>The</span>  <span className='high'>New</span><span className='high2'>Arrival </span>
                        <p className='sub-text'>Nike <span className='sub-high'>Shoes</span> </p> 
                        <p className='Text3'>Discover stylish Nike arrivals, quality comfort, and innovation for your active life.</p>
                       <Link to='/viewProduct'><button className='btn1'>shop now</button></Link> 
                        </div>
                      
                    </Grid>
                    <Grid size={4} className='Image'>
                        <div className="ImageList">
                            <div className="ImageListContent">
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img} className="ImageListItem">
                                        <img
                                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item.img}?w=248&fit=crop&auto=format`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Header;

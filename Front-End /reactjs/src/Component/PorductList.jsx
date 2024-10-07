import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../Style/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching the product data:', error));
  }, []);

  const handleAddToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleIncrement = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] === 1) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] -= 1;
      }
      return updatedCart;
    });
  };

  const getTotalItemCount = () => {
    return Object.values(cart).reduce((total, count) => total + count, 0);
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const productCount = cart[product.id] || 0;
      return total + product.price * productCount;
    }, 0);
  };

  const getCartDetails = () => {
    return products.filter(product => cart[product.id]);
  };

  return (
    <>
      <div className="cart-icon-container">
        <Link to='/viewProfile'><AccountCircleIcon/></Link>
        <p className="total-item-count">{getTotalItemCount()}</p>
        <Link to="/viewCart" state={{ cartItems: getCartDetails(), totalPrice: getTotalPrice() }}>
          <ShoppingCartIcon className="cart-icon" />
        </Link>
      </div>
      <div className="product-list-container">
        {products.map((product) => (
          <Card key={product.id} className="product-card">
            <CardMedia
              image={product.image}
              title={product.title}
              className="product-card-img"
            />
            <CardContent>
              <Typography className="product-card-title">
                {product.title}
              </Typography>
              <Typography variant="body2" className="product-card-price">
                ${product.price}
              </Typography>
            </CardContent>
            <CardActions>
              {cart[product.id] ? (
                <>
                  <Button variant="contained" onClick={() => handleDecrement(product.id)}>
                    -
                  </Button>
                  <Typography variant="body2" className="product-card-count">
                    {cart[product.id]}
                  </Typography>
                  <Button variant="contained" onClick={() => handleIncrement(product.id)}>
                    +
                  </Button>
                </>
              ) : (
                <Button variant="text" onClick={() => handleAddToCart(product.id)}>
                  Add to Cart
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ProductList;

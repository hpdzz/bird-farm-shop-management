import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart, fetchDeleteCarts } from '../../../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

import {
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Avatar,
    IconButton,
    Box,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userID = localStorage.getItem('id');
    const cartItems = useSelector((state) => state.cart.cartData);

    useEffect(() => {
        dispatch(fetchAllCart(userID));
    }, [dispatch, userID]);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);

    const handleToggleProduct = (productID) => {
        const updatedSelection = selectedProducts.includes(productID)
            ? selectedProducts.filter((id) => id !== productID)
            : [...selectedProducts, productID];
        setSelectedProducts(updatedSelection);
    };

    const handleRemoveCart = (cartItemID) => {
        dispatch(fetchDeleteCarts(cartItemID)).then(() => {
            dispatch(fetchAllCart(userID));
        });
    };

    const handleCheckout = () => {
        if (selectedProducts.length > 0) {
            const selectedProductsInfo = selectedProducts.map((productId) => {
                const selectedProduct = cartItems.find((item) => item.id === productId);

                if (selectedProduct) {
                    const discountedPrice = discountedProducts.includes(productId)
                        ? selectedProduct.price
                        : selectedProduct.product.price;

                    return {
                        id: selectedProduct.id,
                        name: selectedProduct.product.name,
                        quantity: selectedProduct.quantity,
                        price: discountedPrice,
                        discount: discountedProducts.includes(productId) ? selectedProduct.product.discount : 0,
                    };
                }

                return null;
            });

            navigate('/user/checkout', {
                state: {
                    selectedProducts: selectedProductsInfo.filter(Boolean),
                },
            });
        }
    };

    const handleToggleDiscount = (productId) => {
        setDiscountedProducts((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        );
    };

    const calculateTotalAmount = (cartItems, selectedProducts, discountedProducts) => {
        let totalAmount = 0;

        for (const item of cartItems) {
            const isSelected = selectedProducts.includes(item.id);
            if (isSelected) {
                const isDiscounted = discountedProducts.includes(item.id);
                const price = isDiscounted ? item.price : item.product.price;
                totalAmount += price * item.quantity;
            }
        }

        return totalAmount;
    };

    const totalAmount = calculateTotalAmount(cartItems, selectedProducts, discountedProducts);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box height={100} />
                <Box display="flex" flexDirection="column" sx={{ marginBottom: 25 }}>
                    <Box flexGrow={1}>
                        <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                            Shopping Cart
                        </Typography>
                        <Divider />
                        <Box height={70} />
                        {cartItems.length === 0 ? (
                            <Container maxWidth="xs">
                                <Stack style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography align="center">Your cart is empty.</Typography>
                                    <Box height={70} />
                                    <Link to="/products" s>
                                        <Button variant="outlined" color="success">
                                            <Typography align="center">
                                                Continue buying <FontAwesomeIcon icon={faCartArrowDown} bounce />
                                            </Typography>
                                        </Button>
                                    </Link>
                                </Stack>
                            </Container>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>STT</TableCell>
                                            <TableCell>Product Image</TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Discount</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Action</TableCell>
                                            <TableCell>Select</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Avatar
                                                        style={{ width: 100, height: 100 }}
                                                        alt={item.product.name}
                                                        src={
                                                            'http://birdsellingapi-001-site1.ctempurl.com/' +
                                                            item.product.image
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>
                                                    <Checkbox onChange={() => handleToggleDiscount(item.id)} />
                                                    {item.product.discount}%
                                                </TableCell>
                                                <TableCell>
                                                    {discountedProducts.includes(item.id)
                                                        ? item.price
                                                        : item.product.price}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => handleRemoveCart([item.id])}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedProducts.includes(item.id)}
                                                        onChange={() => handleToggleProduct(item.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                    <Box height={70} />
                    <Divider />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        padding="16px"
                        borderTop="1px solid #ccc"
                    >
                        <Box marginRight="auto">
                            <Typography variant="h6">Total Items: {cartItems.length}</Typography>
                        </Box>
                        <Box marginRight="16px">
                            <Typography variant="h6">Total Amount: ${totalAmount}</Typography>
                        </Box>
                        <Button
                            onClick={handleCheckout}
                            variant="contained"
                            color="primary"
                            disabled={selectedProducts.length === 0}
                        >
                            Checkout <ShoppingCartIcon style={{ marginLeft: '8px' }} />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Cart;

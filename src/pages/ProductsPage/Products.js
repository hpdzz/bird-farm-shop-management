// import React, { useEffect, useState } from 'react';
// import './Products.scss';
// import Sidebar from '../../components/User/Sidebar/Sidebar';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, getAllProducts } from '../../redux/productSlice';
// import { fetchCategories, getAllCategories } from '../../redux/categorySlice';
// import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import { Link, useNavigate } from 'react-router-dom';
// import { fetchAddToCart, fetchAllCart } from '../../redux/cartSlice';
// import Swal from 'sweetalert2';

// const Products = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const products = useSelector(getAllProducts);
//     const cartItems = useSelector((state) => state.cart.cartData);
//     const categories = useSelector(getAllCategories);
//     // console.log(products);
//     const handleFilterChange = (filterConditions) => {
//         dispatch(fetchProducts(filterConditions));
//     };

//     useEffect(() => {
//         dispatch(fetchProducts());
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     const handleAddToCart = (productId, statusProduct, name) => {
//         const userID = localStorage.getItem('id');

//         const isItemInCart = cartItems.some((item) => item.product_id === productId);

//         if (!userID) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Notification',
//                 text: 'You need to log in to add products to your cart',
//                 confirmButtonText: 'Login',
//                 showCancelButton: true,
//                 cancelButtonText: 'Cancel',
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     navigate('/login');
//                 }
//             });
//         } else {
//             if (statusProduct === 2) {
//                 Swal.fire({
//                     icon: 'info',
//                     title: 'Notification',
//                     text: `The product ${name} is out of stock`,
//                 });
//             } else if (isItemInCart) {
//                 Swal.fire({
//                     icon: 'info',
//                     title: 'Notification',
//                     text: `This product ${name} is already in the cart`,
//                 });
//             } else {
//                 dispatch(fetchAddToCart({ product_id: productId, user_id: userID })).then(() => {
//                     dispatch(fetchAllCart(userID));
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Notification',
//                         text: `Added the product ${name} in cart successfully`,
//                     });
//                 });
//             }
//         }
//     };

//     return (
//         <div>
//             <div className="wrap-sidebar">
//                 <div className="sidebar">
//                     <Sidebar categories={categories} onFilterChange={handleFilterChange} />
//                 </div>
//                 <div className="products">
//                     <Grid container spacing={2}>
//                         {products.map((product) => {
//                             return (
//                                 <Grid item xs={12} sm={6} md={4} key={product.id}>
//                                     <Card sx={{ maxWidth: 345 }}>
//                                         <CardActionArea component={Link} to={`/products/${product.id}`}>
//                                             <CardMedia
//                                                 component="img"
//                                                 height="350px"
//                                                 image={'http://birdsellingapi-001-site1.ctempurl.com/' + product.image}
//                                                 alt={product.name}
//                                                 style={{ objectFit: 'contain' }}
//                                             />
//                                             <CardContent>
//                                                 <Typography
//                                                     paddingBottom={'20px'}
//                                                     gutterBottom
//                                                     variant="h5"
//                                                     component="div"
//                                                 >
//                                                     {product.name}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {product.sex ? 'Male Bird' : 'Female Bird'}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     Price:{' '}
//                                                     <span style={{ fontSize: 'large', fontWeight: 'bold' }}>
//                                                         ${product.price}
//                                                     </span>
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     Status:{' '}
//                                                     <span
//                                                         style={{
//                                                             color:
//                                                                 product.statusProduct === 1
//                                                                     ? 'green'
//                                                                     : product.statusProduct === 2
//                                                                     ? 'red'
//                                                                     : 'inherit',
//                                                             fontWeight: 'bold',
//                                                             fontSize: 'large',
//                                                         }}
//                                                     >
//                                                         {product.statusProduct === 1 ? 'Sell' : 'Sold out'}
//                                                     </span>
//                                                 </Typography>
//                                             </CardContent>
//                                         </CardActionArea>
//                                         <div className="cart-btn">
//                                             <Button
//                                                 variant="contained"
//                                                 onClick={() =>
//                                                     handleAddToCart(product.id, product.statusProduct, product.name)
//                                                 }
//                                             >
//                                                 <AddShoppingCartIcon />
//                                                 Add to Cart
//                                             </Button>
//                                         </div>
//                                     </Card>
//                                 </Grid>
//                             );
//                         })}
//                     </Grid>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Products;

import React, { useEffect, useState } from 'react';
import './Products.scss';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getAllProducts } from '../../redux/productSlice';
import { fetchCategories, getAllCategories } from '../../redux/categorySlice';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAddToCart, fetchAllCart } from '../../redux/cartSlice';
import Swal from 'sweetalert2';
import CompareTable from './Comparable';

// export default CompareTable;
const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(getAllProducts);
    const cartItems = useSelector((state) => state.cart.cartData);
    const categories = useSelector(getAllCategories);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [comparePopupVisible, setComparePopupVisible] = useState(false);

    const handleSelectProduct = (productId) => {
        const isSelected = selectedProducts.includes(productId);

        if (isSelected) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        } else {
            if (selectedProducts.length === 1) {
                setSelectedProducts([...selectedProducts, productId]);
                setComparePopupVisible(true);
            } else if (selectedProducts.length === 0) {
                setSelectedProducts([productId]);
            }
        }
    };

    const handleComparePopupClose = () => {
        setComparePopupVisible(false);
        setSelectedProducts([]);
    };

    const selectedProductsData = products.filter((product) => selectedProducts.includes(product.id));
    const handleFilterChange = (filterConditions) => {
        dispatch(fetchProducts(filterConditions));
    };

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddToCart = (productId, statusProduct, name) => {
        const userID = localStorage.getItem('id');
        const isItemInCart = cartItems.some((item) => item.product_id === productId);

        if (!userID) {
            Swal.fire({
                icon: 'info',
                title: 'Notification',
                text: 'You need to log in to add products to your cart',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } else {
            if (statusProduct === 2) {
                Swal.fire({
                    icon: 'info',
                    title: 'Notification',
                    text: `The product is out of stock`,
                });
            } else if (isItemInCart) {
                Swal.fire({
                    icon: 'info',
                    title: 'Notification',
                    text: `This product is already in the cart`,
                });
            } else {
                dispatch(fetchAddToCart({ product_id: productId, user_id: userID })).then(() => {
                    dispatch(fetchAllCart(userID));
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `Added the product in cart successfully`,
                    });
                });
            }
        }
    };

    return (
        <div>
            <div className="wrap-sidebar">
                <div className="sidebar">
                    <Sidebar categories={categories} onFilterChange={handleFilterChange} />
                </div>
                <div className="products">
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea component={Link} to={`/products/${product.id}`}>
                                        <CardMedia
                                            component="img"
                                            height="350px"
                                            image={'http://birdsellingapi-001-site1.ctempurl.com/' + product.image}
                                            alt={product.name}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <CardContent>
                                            <Typography
                                                paddingBottom={'20px'}
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.sex ? 'Male Bird' : 'Female Bird'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: <span style={{ fontWeight: 'bold' }}>${product.price}</span>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Status:{' '}
                                                <span
                                                    style={{
                                                        color: product.statusProduct === 1 ? 'green' : 'red',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.statusProduct === 1 ? 'Sell' : 'Sold out'}
                                                </span>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <div className="cart-btn">
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleAddToCart(product.id, product.statusProduct, product.name)
                                            }
                                            style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }}
                                        >
                                            <AddShoppingCartIcon />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleSelectProduct(product.id)}
                                            style={{
                                                backgroundColor: selectedProducts.includes(product.id)
                                                    ? '#FFC107'
                                                    : '#2196F3',
                                            }}
                                        >
                                            {selectedProducts.includes(product.id) ? 'Unselect' : 'Select'}
                                        </Button>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {comparePopupVisible && (
                        <CompareTable products={selectedProductsData} open={true} onClose={handleComparePopupClose} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;

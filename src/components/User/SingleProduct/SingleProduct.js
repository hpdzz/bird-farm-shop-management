import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './SingleProduct.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSingle, getProductSingle } from '../../../redux/productSlice';
import { fetchAddToCart, fetchAllCart } from '../../../redux/cartSlice';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom/dist';
import { Button, Typography } from '@mui/material';

const SingleProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        dispatch(fetchProductSingle(id));
    }, [dispatch, id]);
    const productSingle = useSelector(getProductSingle);
    console.log('single', productSingle);
    const item = useSelector((state) => state.cart.cartData);

    const userID = localStorage.getItem('id');
    const handleAddToCart = () => {
        if (authContext.isAuthenticated === false) {
            Swal.fire({
                icon: 'info',
                title: 'Notfication',
                text: 'You need to log in to add products to your cart',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } else {
            if (productSingle) {
                const isItemInCart = item.some((item) => item.product_id === id);
                if (productSingle.statusProduct === 2) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Error',
                        text: `The product is out of stock`,
                    });
                } else if (isItemInCart) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Error',
                        text: `This product is already in the cart`,
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `Added the product in cart successfully`,
                    });
                    dispatch(fetchAddToCart({ product_id: id, user_id: userID })).then(() => {
                        dispatch(fetchAllCart(userID));
                    });
                }
            }
        }
    };

    // if (productSingle.category_id === '7b37a98498e84dfbb265a8772b7ce894') {
    //     return (
    //         <div>
    //             <div className="single-product-main-contain">
    //                 <div className="layout">
    //                     <h2>Combo</h2>
    //                     <Typography variant="body2" color="text.secondary">
    //                         {productSingle.name}
    //                     </Typography>
    //                     <Typography variant="body2" color="text.secondary">
    //                         {productSingle.bird_father_id}
    //                     </Typography>
    //                     <Typography variant="body2" color="text.secondary">
    //                         {productSingle.bird_mother_id}
    //                     </Typography>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else
    return (
        <div className="single-product-main-contain">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={`http://birdsellingapi-001-site1.ctempurl.com/${productSingle.image}`} alt="" />
                    </div>
                    <div className="right">
                        <Typography gutterBottom variant="h5" component="div">
                            {productSingle.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {productSingle.sex ? 'Male Bird' : 'Female Bird'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {productSingle.description}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Date of Birth: {productSingle.day_of_birth}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: <span style={{ fontSize: 'large', fontWeight: 'bold' }}>${productSingle.price}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span
                                style={{
                                    color:
                                        productSingle.statusProduct === 1
                                            ? 'green'
                                            : productSingle.statusProduct === 2
                                            ? 'red'
                                            : 'inherit',
                                    fontWeight: 'bold',
                                    fontSize: 'large',
                                }}
                            >
                                {productSingle.statusProduct === 1 ? 'Sell' : 'Sold out'}
                            </span>
                        </Typography>
                        <div className="cart-button">
                            <Button
                                variant="contained"
                                onClick={handleAddToCart}
                                style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }}
                            >
                                <AddShoppingCartIcon fontSize={'large'} />
                                ADD TO CART
                            </Button>
                        </div>
                        <span className="divider"></span>
                        <div className="info-item">
                            <span className="text-bold">
                                <p>Category:</p>
                                <span>Bird</span>
                            </span>
                            <span className="text-bold">
                                <p> Share:</p>
                                <span className="social-icons">
                                    <FacebookIcon />
                                    <InstagramIcon />
                                    <TwitterIcon />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SingleProduct;

// import React, { useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Swal from 'sweetalert2';

// const apiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

// export default function Review() {
//     const [userId, setUserId] = useState('');
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 // Lấy danh sách các sản phẩm trong giỏ hàng của user từ API
//                 const cartResponse = await fetch(`${apiUrl}Cart/Get-All-Cart`);
//                 const cartData = await cartResponse.json();

//                 console.log('cartData:', cartData);

//                 if (cartData.statusCode === 200) {
//                     const userCartItems = cartData.data.filter((item) => item.user_id === userId);

//                     // Extract product information from userCartItems
//                     const productsData = userCartItems.map((item) => ({
//                         id: item.id,
//                         name: item.product.name,
//                         price: item.price,
//                     }));

//                     // Set the products state with the extracted product information
//                     setProducts(productsData);
//                 } else {
//                     console.error('Failed to fetch cart data:', cartData.messageError);
//                 }
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };

//         // Lấy user_id từ local storage
//         const storedUserId = localStorage.getItem('id');
//         if (storedUserId) {
//             setUserId(storedUserId);

//             // Gọi hàm để lấy thông tin sản phẩm
//             fetchProductDetails();
//         }
//     }, [userId]);

//     const handlePlaceOrder = async () => {
//         try {
//             // Lấy danh sách các sản phẩm trong giỏ hàng của user từ API
//             const cartResponse = await fetch(`${apiUrl}Cart/Get-All-Cart`);
//             const cartData = await cartResponse.json();

//             console.log('cartData:', cartData);

//             if (cartData.statusCode === 200 && Array.isArray(cartData.data)) {
//                 const userCartItems = cartData.data.filter((item) => item.user_id === userId);

//                 // Check if there are items in the user's cart
//                 if (userCartItems.length > 0) {
//                     // Lấy các ID sản phẩm từ giỏ hàng
//                     const productIds = userCartItems.map((item) => item.id);

//                     // Tạo đối tượng order để gửi lên API
//                     const orderData = {
//                         listIDCarts: productIds,
//                         user_id: userId,
//                         paymentMenthod_id: '89f5deddc7984625885c9055ebb0ca2a', // Replace with your actual payment method ID
//                         address: 'HCM', // Replace with your actual address
//                     };

//                     // Gửi request đặt hàng lên API
//                     const orderResponse = await fetch(`${apiUrl}Order/Create-Order`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(orderData),
//                     });

//                     if (orderResponse.ok) {
//                         // Xử lý khi đặt hàng thành công, ví dụ: xóa sản phẩm khỏi giỏ hàng, hiển thị thông báo, chuyển hướng trang, vv.
//                         console.log('Order placed successfully!');
//                         Swal.fire({
//                             icon: 'success',
//                             title: 'Đặt hàng thành công!',
//                             text: 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức.',
//                         });
//                     } else {
//                         // Xử lý khi đặt hàng thất bại
//                         console.error('Failed to place order');
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Đặt hàng thất bại',
//                             text: 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.',
//                         });
//                     }
//                 } else {
//                     console.error('User has no items in the cart');
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Bạn Không Có Sản Phẩm',
//                         text: 'Vui lòng thêm sản phẩm và thử lại.',
//                     });
//                 }
//             } else {
//                 console.error('Failed to fetch cart data:', cartData.messageError);
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Đã có lỗi xảy ra',
//                 text: 'Đã có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại sau.',
//             });
//         }
//     };

//     return (
//         <React.Fragment>
//             <Typography variant="h6" gutterBottom>
//                 Đơn hàng của bạn
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item container direction="column" xs={12} sm={6}>
//                     <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                         Thông tin sản phẩm:
//                     </Typography>
//                     <List>
//                         {products.map((product) => (
//                             <ListItem key={product.id}>
//                                 <ListItemText primary={product.name} secondary={`Giá: ${product.price}`} />
//                             </ListItem>
//                         ))}
//                     </List>
//                     <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
//                         Place Order
//                     </Button>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Typography variant="h11" gutterBottom sx={{ mt: -5 }}>
//                         Phương thức vận chuyển: Ship COD
//                     </Typography>
//                 </Grid>
//             </Grid>
//         </React.Fragment>
//     );
// }
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Review = ({ shippingInfo }) => {
    const location = useLocation();
    const selectedProducts = location.state?.selectedProducts || [];
    console.log('shippingInfo', shippingInfo.address1);
    const calculateTotalAmount = () => {
        return selectedProducts.reduce((total, product) => {
            return total + product.price;
        }, 0);
    };

    return (
        <div>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <List disablePadding>
                    {selectedProducts.map((product) => (
                        <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={product.name} />
                            <Typography variant="body2">${product.price}</Typography>
                        </ListItem>
                    ))}
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            $ {calculateTotalAmount()}
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Shipping
                        </Typography>
                        <Typography gutterBottom>{shippingInfo.firstName + ' ' + shippingInfo.lastName}</Typography>
                        <Typography gutterBottom>{shippingInfo.address}</Typography>
                        <Typography gutterBottom>{shippingInfo.phone}</Typography>
                        <Typography gutterBottom>{shippingInfo.city}</Typography>
                        <Typography gutterBottom>{shippingInfo.country}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6} style={{ textAlign: 'end' }}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Payment Method
                        </Typography>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h11" gutterBottom sx={{ mt: -5 }}>
                                Ship COD
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        </div>
    );
};

export default Review;

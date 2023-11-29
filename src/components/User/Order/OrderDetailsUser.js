import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LoadingPage from '../../Navbar/LoadingPage';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FeedbackComponent from '../FeedBack/FeedbackComponent';

const OrderDetailsUser = () => {

    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [tableRows, setTableRows] = useState([]);
    const [userData, setUserData] = useState({});
    const userID = localStorage.getItem('id');
    const [showFeedback, setShowFeedback] = useState(false);
    const handleFeedbackClick = () => {
        setShowFeedback(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://birdsellingapi-001-site1.ctempurl.com/api/User/GetSingleID?id=${userID}`
                );
                const data = await response.json();
                setUserData(data.data);



            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [userID]);
    useEffect(() => {
        const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=';
        fetch(baseUrl + id)
            .then((response) => response.json())
            .then((data) => {
                setOrderDetails(data.data);
                renderTableAsync(data.data);

            })

            .catch((error) => console.log(error.message));
    }, [id]);

    console.log(orderDetails);
    const renderTableAsync = (orderDetails) => {
        try {
            renderTable(orderDetails).then((rows) => setTableRows(rows));
        } catch (error) {
            console.error('Error rendering table:', error.message);
            setTableRows([]);
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case 1:
                return 'Chờ Xác Nhận';
            case 2:
                return 'Đã Xác Nhận';
            case 3:
                return 'Đang Vận Chuyển';
            case 4:
                return 'Đã Nhận Hàng';
            case 5:
                return 'Hủy Đơn';
            case 6:
                return 'Hoàn Trả Hàng';
            case 7:
                return 'Hết Hàng';
            default:
                return 'Unknown';
        }
    };

    const fetchProductDetails = async (productId) => {
        const productDetailsUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${productId}`;
        try {
            const response = await fetch(productDetailsUrl);
            const productDetails = await response.json();
            return productDetails.data;
        } catch (error) {
            console.error('Error fetching product details:', error.message);
            return null;
        }
    };

    const [cartsData, setCartsData] = useState([]);
    useEffect(() => {
        if (orderDetails && orderDetails.carts) {
            setCartsData(orderDetails.carts);
        }
    }, [orderDetails]);
    const renderTable = async (orderDetails) => {

        if (!orderDetails || !orderDetails.carts || orderDetails.carts.length === 0) {
            return [
                <TableRow key="no-items">
                    <TableCell colSpan={3} align="center">
                        No items in the order
                    </TableCell>
                </TableRow>,
            ];
        }

        if (!orderDetails.carts) {
            return null;
        }

        const productDetailsPromises = orderDetails.carts.map((cart) =>
            fetchProductDetails(cart.product_id)
        );

        try {
            const productDetails = await Promise.all(productDetailsPromises);


            console.log('Carts', orderDetails.carts);
            // Render table rows
            return orderDetails.carts.map((cart, index) => (
                <TableRow key={cart.product_id}>

                    <TableCell style={{ fontSize: '15px' }} align="center">
                        {productDetails[index] ? (
                            <>

                                <img
                                    src={`http://birdsellingapi-001-site1.ctempurl.com/${productDetails[index].image}`}
                                    alt="Product"
                                    style={{ width: '180px', height: '150px' }}
                                />
                                <Typography>{productDetails[index].name}</Typography>
                            </>
                        ) : (
                            'Unknown'
                        )}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px' }} align="center">
                        {cart.quantity}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px' }} align="center">
                        {cart.price} $
                    </TableCell>
                </TableRow>
            ));
        } catch (error) {
            console.error('Error fetching product details:', error.message);
            return [];
        }
    };


    const handleStatusChange = async (newStatus) => {
        try {
            const confirmationResult = await Swal.fire({
                icon: 'question',
                title: 'Confirm Status Change',
                text: 'Are you sure you want to update the order status?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
            });

            if (confirmationResult.isConfirmed) {
                const updateStatusUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Order/Update-Status-Product?orderId=${id}&orderStatus=${newStatus}`;
                await fetch(updateStatusUrl, { method: 'PUT' });
                console.log(updateStatusUrl);
                // Fetch and update the order details again after status change
                const updatedOrderDetails = await fetchOrderDetails(id);
                setOrderDetails(updatedOrderDetails);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Order status updated successfully.',
                });
            }
        } catch (error) {
            console.error('Error updating order status:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Fail to update status.',
            });
        }
    };

    if (!orderDetails) {
        return <LoadingPage />;
    }

    return (
        <React.Fragment>
            <TableContainer style={{ marginBottom: '30px' }}>
                <CssBaseline />
                <Container fixed>
                    <Box height={100} />
                    <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                        Xem chi tiết đặt hàng
                    </Typography>
                    <Divider />
                    <Box height={70} />

                    <Box sx={{ height: '123vh' }}>
                        <Grid container spacing={2}>
                            <Grid xs={3} md={4}>
                                <Card sx={{ height: '75vh' }}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Typography variant="h6" gutterBottom>Thông tin người nhận</Typography>
                                            <Divider />
                                            <br />
                                            <Typography variant="h6" gutterBottom>Mã đơn hàng: {orderDetails.id}</Typography>
                                            <Typography variant="h6" gutterBottom>Ngày đặt hàng: {new Date(orderDetails.order_date).toLocaleDateString()}</Typography>
                                            <Typography variant="h6" gutterBottom>Trạng thái: {getStatusName(orderDetails.orderStatus)}</Typography>
                                            <>
                                                <Typography variant="h6" gutterBottom>Name : {userData.name}</Typography>
                                                <Typography variant="h6" gutterBottom>Phone : {userData.userPhone}</Typography>
                                                <Typography variant="h6" gutterBottom>Address : {userData.addressLine}</Typography>
                                                <Typography variant="h6" gutterBottom>Ship: COD </Typography>
                                            </>
                                            <Stack spacing={2}>
                                                <Link to="/user/order" className="add-btn" style={{ marginTop: '155px' }}>
                                                    <Button sx={{ fontSize: 20 }} variant="contained">
                                                        Back
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={9} md={8}>
                                <Card sx={{ height: 'auto' }}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Typography variant="h6" gutterBottom>
                                                Chi tiết đơn hàng
                                            </Typography>
                                            <Divider />
                                            <br />
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="order-table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ fontSize: '20px' }} align="center">
                                                            Sản Phẩm
                                                        </TableCell>
                                                        <TableCell style={{ fontSize: '20px' }} align="center">
                                                            Số Lượng
                                                        </TableCell>
                                                        <TableCell style={{ fontSize: '20px' }} align="center">
                                                            Giá Tiền
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>{tableRows}</TableBody>
                                            </Table>
                                        </Stack>
                                        <br />
                                        <br />
                                        <br />
                                        <Divider />
                                        <br />
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Stack>
                                                <Typography variant="h6" gutterBottom> Tổng tiền: {orderDetails.orderTotal}$</Typography>
                                            </Stack>
                                            {orderDetails.orderStatus === 1 || orderDetails.orderStatus === 2 ? (
                                                <Button
                                                    sx={{ fontSize: 16, backgroundColor: '#FF0000', color: '#FFFFFF' }}
                                                    variant="contained"
                                                    onClick={() => handleStatusChange('5')}
                                                >
                                                    Hủy Đơn
                                                </Button>
                                            ) : orderDetails.orderStatus === 3 ? (
                                                <Button
                                                    sx={{ fontSize: 16, backgroundColor: '#008000', color: '#FFFFFF' }}
                                                    variant="contained"
                                                    onClick={() => handleStatusChange('4')}
                                                >
                                                    Đã Nhận Hàng
                                                </Button>
                                            ) : orderDetails.orderStatus === 4 ? (
                                                <div>
                                                    <Button
                                                        sx={{ fontSize: 16, backgroundColor: '#FF0000', color: '#FFFFFF' }}
                                                        variant="contained"
                                                        onClick={() => handleStatusChange('6')}
                                                    >
                                                        Hoàn Trả Hàng
                                                    </Button>
                                                    <br />
                                                    <br />
                                                    <Button
                                                        sx={{ fontSize: 16, width: '173px' }}
                                                        variant="contained" color="success"
                                                        onClick={handleFeedbackClick}>
                                                        Feedback
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </div>
                                        {showFeedback && (

                                            <FeedbackComponent cartsData={cartsData} onClose={() => setShowFeedback(false)} />
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </TableContainer>
        </React.Fragment>
    );
};

const fetchOrderDetails = async (orderId) => {
    const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=';
    try {
        const response = await fetch(baseUrl + orderId);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching updated order details:', error.message);
        return null;
    }
};

export default OrderDetailsUser;




import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TablePagination from '@mui/material/TablePagination';
import LoadingPage from '../../Navbar/LoadingPage';

function OrderUser() {
    const [orders, setOrders] = useState([]);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
    const [baseUrl] = useState('http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('id');

        // If user ID exists, fetch all orders
        if (userId) {
            fetch(baseUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // Filter orders based on user ID
                    const userOrders = data.data.filter(order => order.user_id === userId);
                    setOrders(userOrders);
                    setTimeout(() => setLoading(false), 700);
                })
                .catch((error) => console.log(error.message));
        } else {
            console.error('User ID not found in local storage');
            // Handle the case where the user ID is not available in local storage
        }
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    if (loading) {
        return <LoadingPage />;
    }
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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const filteredOrders = selectedStatusFilter === 'all'
        ? orders
        : orders.filter((order) => order.orderStatus.toString() === selectedStatusFilter);

    const sortedOrders = filteredOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    const slicedOrders = sortedOrders.slice(page * rowsPerPage, (page + 1) * rowsPerPage);



    return (
        <TableContainer style={{ marginBottom: '30px' }}>
            <CssBaseline />
            <Container fixed>
                <Box height={100} />
                <Box sx={{ flexGrow: 1, height: '400hv' }}>
                    <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                        My Order List
                    </Typography>
                    <Divider />
                    <Box height={20} />
                    <Box sx={{ display: 'flex' }}>
                        <Box component="main" sx={{ flexGrow: 1, p: 6, marginBottom: 45 }}>
                            <div className="main">
                                {(
                                    <TableContainer component={Paper} className="dashboard-container">
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="order-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontSize: '20px' }} align="center">Ngày Đặt Hàng</TableCell>
                                                    <TableCell style={{ fontSize: '20px' }} align="center">Tổng Tiền</TableCell>
                                                    <TableCell style={{ fontSize: '20px' }} align="center">Trạng Thái</TableCell>
                                                    <TableCell style={{ fontSize: '20px' }} align="center">Chi Tiết</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {slicedOrders.map((order) => (
                                                    <TableRow key={order.id}>
                                                        <TableCell style={{ fontSize: '15px' }} align="center">{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                                        <TableCell style={{ fontSize: '15px' }} align="center">{order.orderTotal}</TableCell>
                                                        <TableCell style={{ fontSize: '15px' }} align="center">{getStatusName(order.orderStatus)}</TableCell>
                                                        <TableCell align="center">
                                                            <Link to={`/user/order/${order.id}`} style={{ textDecoration: 'none' }}>
                                                                <Button variant="outlined" color="success" className="edit-btn">
                                                                    <VisibilityIcon sx={{ fontSize: 20 }} />
                                                                </Button>
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={sortedOrders.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>
                                )}
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </TableContainer>
    );
}

export default OrderUser;

import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import OrderDetailsDialog from './OrderDetails';
import TablePagination from '@mui/material/TablePagination';
import ProductTable from './ProductTable';


function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
    const [baseUrl] = useState('http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Order/Update-Status-Product?orderId=${orderId}&orderStatus=${newStatus}`, {
                method: 'PUT',
            });

            if (response.ok) {
                toast.success('Updated order status successfully!');
                // Update the local state (orders array) with the new status
                setOrders(prevOrders => {
                    return prevOrders.map(order => {
                        if (order.id === orderId) {
                            return { ...order, orderStatus: newStatus };
                        }
                        return order;
                    });
                });
            } else {
                console.error('Failed to update order status');
                toast.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Error updating order status');
        }
    };

    useEffect(() => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => setOrders(data.data))
            .catch((error) => console.log(error.message));
    }, []);


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

    const handleViewDetails = (id) => {
        // Fetch data for the selected order by ID
        const orderDetailsUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=${id}`;

        fetch(orderDetailsUrl)
            .then((response) => response.json())
            .then((data) => {
                setSelectedOrder(data);
                setIsDetailsDialogOpen(true);
                console.log(data);
            })
            .catch((error) => console.log(error.message));
    };
    const handleStatusFilterChange = (event) => {
        setSelectedStatusFilter(event.target.value);
    };

    const filteredOrders = selectedStatusFilter === 'all'
        ? orders
        : orders.filter((order) => order.orderStatus.toString() === selectedStatusFilter);

    const sortedOrders = filteredOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    const slicedOrders = sortedOrders.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarManager />
            <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
                <AppBarManager />
                <div className="main">
                    <Select
                        value={selectedStatusFilter}
                        onChange={handleStatusFilterChange}
                        style={{ marginTop: '30px' }}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                        <MenuItem value="2">Đã Xác Nhận</MenuItem>
                        <MenuItem value="3">Đang Vận Chuyển</MenuItem>
                        <MenuItem value="4">Đã Nhận Hàng</MenuItem>
                        <MenuItem value="5">Hủy Đơn</MenuItem>
                        <MenuItem value="6">Hoàn Trả Hàng</MenuItem>
                        <MenuItem value="7">Hết Hàng</MenuItem>
                    </Select>
                    {(
                        <TableContainer component={Paper} className="dashboard-container">
                            <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Đơn Hàng</h2>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="order-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Tên Người Dùng</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Ngày Đặt Hàng</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Tổng Tiền</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Trạng Thái</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Hành Động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {slicedOrders.map((order) => (
                                        <TableRow key={order.id_order}>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{order.user.userName}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{order.orderTotal}</TableCell>
                                            <TableCell align="center">
                                                <Select
                                                    value={order.orderStatus}
                                                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                                                >
                                                    <MenuItem value={1}>Chờ Xác Nhận</MenuItem>
                                                    <MenuItem value={2}>Đã Xác Nhận</MenuItem>
                                                    <MenuItem value={3}>Đang Vận Chuyển</MenuItem>
                                                    <MenuItem value={4}>Đã Nhận Hàng</MenuItem>
                                                    <MenuItem value={5}>Hủy Đơn</MenuItem>
                                                    <MenuItem value={6}>Hoàn Trả Hàng</MenuItem>
                                                    <MenuItem value={7}>Hết Hàng</MenuItem>
                                                </Select>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        handleViewDetails(order.id);
                                                        setIsDialogOpen(true);
                                                    }}
                                                >
                                                    <VisibilityIcon sx={{ fontSize: 20 }} />
                                                </Button>
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
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <div>
                            <p>User Name: {selectedOrder.data.userName}</p>
                            <p>Order Date: {new Date(selectedOrder.data.order_date).toLocaleDateString()}</p>
                            <p>ID Order: {selectedOrder.data.id}</p>
                            <p>Status: {getStatusName(selectedOrder.data.orderStatus)}</p>
                            <ProductTable carts={selectedOrder.data.carts} />
                            <p>Total Amount: {selectedOrder.data.orderTotal}</p>
                        </div>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <OrderDetailsDialog
                isOpen={isDetailsDialogOpen}
                onClose={() => setIsDetailsDialogOpen(false)}
                orderDetails={selectedOrder}
                handleChangeStatus={handleChangeStatus}
            />
        </Box>
    );
}

export default OrderManager;

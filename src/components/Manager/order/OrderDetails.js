import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem } from '@mui/material';

const OrderDetails = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=';
        fetch(baseUrl + id)
            .then((response) => response.json())
            .then((data) => {
                setOrderDetails(data.data);
                setSelectedStatus(data.data.orderStatus.toString()); // Assuming orderStatus is a string
            })
            .catch((error) => console.log(error.message));
    }, [id]);

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

    const handleStatusUpdate = (newStatus) => {
        const updateStatusUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Order/Update-Status-Product?orderId=${id}&orderStatus=${newStatus}`;

        fetch(updateStatusUrl, {
            method: 'PUT',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Status updated successfully');
                // Optionally update the local state or perform other actions upon successful update
            })
            .catch((error) => {
                console.error('Error updating status:', error.message);
            });
    };

    const handleChangeStatus = (event) => {
        setSelectedStatus(event.target.value);
        handleStatusUpdate(event.target.value);
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <SidebarManager />
                <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                    <AppBarManager />
                    <h2
                        style={{
                            color: '#205295',
                            fontSize: '40px',
                            marginTop: '20px',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        Chi tiết đơn hàng
                    </h2>
                    <p>Order Date: {orderDetails.order_date}</p>
                    <p>Mã đơn hàng: {orderDetails.id}</p>
                    <p>Tổng tiền: {orderDetails.orderTotal}</p>
                    <p>Trạng thái: {getStatusName(orderDetails.orderStatus)}</p>
                    <Select
                        value={selectedStatus}
                        onChange={handleChangeStatus}
                        style={{ marginRight: '10px' }}
                    >
                        <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                        <MenuItem value="2">Đã Xác Nhận</MenuItem>
                        <MenuItem value="3">Đang Vận Chuyển</MenuItem>
                        <MenuItem value="4">Đã Nhận Hàng</MenuItem>
                        <MenuItem value="5">Hủy Đơn</MenuItem>
                        <MenuItem value="6">Hoàn Trả Hàng</MenuItem>
                        <MenuItem value="7">Hết Hàng</MenuItem>
                    </Select>
                    <p>Tên người dùng: {orderDetails.id}</p>
                    <p>Địa chỉ: {orderDetails.address}</p>
                    <Link to="/manager/order" className="add-btn">
                        <Button sx={{ fontSize: 20 }} variant="contained" onClick={() => setIsDialogOpen(true)}>
                            Back
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {orderDetails && (
                        <div>
                            <p>Order Date: {orderDetails.order_date}</p>
                            <p>Mã đơn hàng: {orderDetails.id}</p>
                            <p>Tổng tiền: {orderDetails.orderTotal}</p>
                            <p>Trạng thái: {getStatusName(orderDetails.orderStatus)}</p>
                            <Select
                                value={orderDetails.orderStatus.toString()}
                                onChange={(event) => handleChangeStatus(event.target.value)}
                                style={{ marginRight: '10px' }}
                            >
                                <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                                <MenuItem value="2">Đã Xác Nhận</MenuItem>
                                <MenuItem value="3">Đang Vận Chuyển</MenuItem>
                                <MenuItem value="4">Đã Nhận Hàng</MenuItem>
                                <MenuItem value="5">Hủy Đơn</MenuItem>
                                <MenuItem value="6">Hoàn Trả Hàng</MenuItem>
                                <MenuItem value="7">Hết Hàng</MenuItem>
                            </Select>
                            <p>Tên người dùng: {orderDetails.id}</p>
                            <p>Địa chỉ: {orderDetails.address}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderDetails;

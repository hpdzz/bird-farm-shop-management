import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

const apiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll';

function preventDefault(event) {
    event.preventDefault();
}


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Orders() {
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();
    const handleOrder = () => {
        navigate('/manager/order/');
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

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const sortedOrders = data.data.sort((a, b) => {
                    return new Date(b.order_date) - new Date(a.order_date);
                });

                const firstTenOrders = sortedOrders.slice(0, 10);

                setOrderData(firstTenOrders);
            })
            .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);

    return (
        <React.Fragment>
            <Title>Các đơn hàng gần đây</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Total Order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{formatDate(order.order_date)}</TableCell>
                            <TableCell>{order.user.userName}</TableCell>
                            <TableCell>{getStatusName(order.orderStatus)}</TableCell>
                            <TableCell align="right">{`$${order.orderTotal}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                variant="contained"
                color="primary"
                to="/manager/order"
                onClick={handleOrder}
                sx={{ mt: 3 }}
            >
                Xem thêm đơn đặt hàng
            </Button>
        </React.Fragment>
    );
}

import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { MenuItem, Select } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

function ProductManager() {
    const [staff, setStaff] = useState([]);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
    const [baseUrl] = useState('http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProduct');
    const [selectedFile, setSelectedFile] = useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => setStaff(data.data))
            .catch((error) => console.log(error.message));
    }, []);

    const navigate = useNavigate();

    const EditFunction = (id) => {
        navigate('/manager/edit-product/' + id);
    };

    const RemoveFunction = (id) => {
        if (window.confirm(`Xóa: ${id}`)) {
            const baseUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Product/DeleteProduct`;
            fetch(baseUrl + '/' + id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(`Xóa ID: ${id} thành công!`);
                        setStaff((prevStaff) => prevStaff.filter((staff) => staff.id !== id));
                    } else {
                        throw new Error('Xóa không thành công.');
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        } else {
            // Người dùng hủy bỏ, không làm gì cả
            toast.warning('Hủy bỏ xóa');
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case 1:
                return 'Còn Hàng';
            case 2:
                return 'Đã Bán';
            case 3:
                return 'Lỗi';
            case 4:
                return 'Không Bán';
            default:
                return 'Unknown';
        }
    };

    const filteredProduct = selectedStatusFilter === 'all'
        ? staff
        : staff.filter((staff) => staff.category_id === selectedStatusFilter);
    let sortedProduct = filteredProduct;

    // Sắp xếp theo trạng thái (statusProduct)
    sortedProduct.sort((a, b) => a.statusProduct - b.statusProduct);

    const slicedProduct = sortedProduct.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarManager />
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                <AppBarManager />
                <div className="main">
                    <Select
                        value={selectedStatusFilter}
                        onChange={(e) => setSelectedStatusFilter(e.target.value)}
                        style={{ marginTop: '30px' }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="51d334ad9f0a48a59fa4c7a20f70dcfd">Đại bàng</MenuItem>
                        <MenuItem value="6a2aab32b3574510a434136b31cec3df">Vẹt</MenuItem>
                        <MenuItem value="6bc3f28de70c4982b67d3bd1f0011cf2">Chào mào</MenuItem>
                        <MenuItem value="7b37a98498e84dfbb265a8772b7ce894">Tổ chim	</MenuItem>
                    </Select>
                    <TableContainer component={Paper} className="dashboard-container">
                        <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Sản Phẩm</h2>
                        <Link to="/manager/new-product" className="add-btn">
                            <Button sx={{ fontSize: 20 }} variant="contained">
                                Create
                            </Button>
                        </Link>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="staff-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">ID</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Avatar</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Tên</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Giá</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Trạng Thái</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slicedProduct.map((staff) => (
                                    <TableRow key={staff.id}>
                                        <TableCell style={{ fontSize: '13px' }} align="center">{staff.id}</TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            <img style={{ width: '150px', height: '150px' }} src={'http://birdsellingapi-001-site1.ctempurl.com/' + staff.image} alt="" />
                                        </TableCell>
                                        <TableCell style={{ fontSize: '13px' }} align="center">{staff.name}</TableCell>
                                        <TableCell style={{ fontSize: '13px' }} align="center">{staff.price}</TableCell>
                                        <TableCell style={{ fontSize: '14px', fontWeight: 'bold' }} align="center">
                                            {getStatusName(staff.statusProduct)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                color="success"
                                                className="edit-btn"
                                                onClick={() => {
                                                    EditFunction(staff.id);
                                                }}
                                            >
                                                <EditIcon sx={{ fontSize: 25 }} />
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                className="delete-btn"
                                                onClick={() => {
                                                    RemoveFunction(staff.id);
                                                }}
                                            >
                                                <DeleteIcon sx={{ fontSize: 25 }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={sortedProduct.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </Box>
        </Box>
    );
}

export default ProductManager;

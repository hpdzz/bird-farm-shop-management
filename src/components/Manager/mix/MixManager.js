import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, MenuItem, Select, TextField, FormControl, InputLabel } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { margin } from '@mui/system';

function MixManager() {
    const validationSchema = Yup.object().shape({
        ngayChoPhoi: Yup.date().required('Ngày Cho Phối is required'),
        ngayCoTrung: Yup.date().required('Ngày Có Trứng is required'),
        ngayTrungNo: Yup.date().required('Ngày Trứng Nở is required'),
        soTrung: Yup.number().required('Số Trứng is required'),
        soTrungNo: Yup.number().required('Số Trứng Nở is required'),
        soTrungHong: Yup.number().required('Số Trứng Hỏng is required'),
        soChimGiao: Yup.number().required('Số Chim Giao is required'),
        giaTien: Yup.number().required('Giá Tiền is required'),
        daThanhToan: Yup.number().required('Đã Thanh Toán is required'),
        conLai: Yup.number().required('Còn Lại is required'),
    });

    const [mixes, setMixes] = useState([]);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
    const [baseUrl] = useState('http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/GetAllPhoiChim');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedMix, setSelectedMix] = useState(null);
    const [selectedDialogStatus, setSelectedDialogStatus] = useState(selectedMix ? selectedMix.phoiGiongStatus.toString() : '1');

    const handleOpenEditDialog = (mix) => {
        setSelectedMix(mix);
        setOpenEditDialog(true);
        setSelectedDialogStatus(mix ? mix.phoiGiongStatus.toString() : '1');
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

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
            .then((data) => setMixes(data.data))
            .catch((error) => console.log(error.message));
    }, []);

    const getStatusName = (phoiGiongStatus) => {
        switch (phoiGiongStatus) {
            case 1:
                return "Chờ Xác Nhận";
            case 2:
                return "Đã Xác Nhận";
            case 3:
                return "Đã Hủy";
            case 4:
                return "Thành Công";
            case 5:
                return "Phối Thành Công";
            case 6:
                return "Phối Thất Bại";
            case 7:
                return "Đang Ấp Trứng";
            case 8:
                return "Đã Nở Trứng";
            default:
                return "Lỗi";
        }
    };

    const filteredMixes = selectedStatusFilter === 'all'
        ? mixes
        : mixes.filter((mix) => mix.phoiGiongStatus === parseInt(selectedStatusFilter, 10));

    const sortedMixes = [...filteredMixes].sort((a, b) => {
        const timeA = new Date(a.createdTime).getTime();
        const timeB = new Date(b.createdTime).getTime();

        // Sắp xếp giảm dần (nếu bạn muốn sắp xếp tăng dần, đảo ngược dấu "timeA - timeB")
        return timeB - timeA;
    });

    const slicedMixes = sortedMixes.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const handleStatusUpdate = () => {
        const updateStatusUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/UpdateTrangThaiPhoiGiong?phoiGiongId=${selectedMix.id}`;

        const updateStatusBody = {
            "bird_KH_id": selectedMix.bird_KH_id,
            "bird_Shop_id": selectedMix.bird_Shop_id,
            "ngayChoPhoi": formik.values.ngayChoPhoi ? format(new Date(formik.values.ngayChoPhoi), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
            "ngayCoTrung": formik.values.ngayCoTrung ? format(new Date(formik.values.ngayCoTrung), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
            "ngayTrungNo": formik.values.ngayTrungNo ? format(new Date(formik.values.ngayTrungNo), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null,
            "soTrung": formik.values.soTrung || null,
            "soTrungNo": formik.values.soTrungNo || null,
            "soTrungHong": formik.values.soTrungHong || null,
            "soChimGiao": formik.values.soChimGiao || null,
            "phoiGiongStatus": parseInt(selectedDialogStatus, 10) || null,
            "giaTien": formik.values.giaTien || null,
            "daThanhToan": formik.values.daThanhToan || null,
            "conLai": formik.values.conLai || null
        };
        console.log('Data to be sent:', updateStatusBody);
        fetch(updateStatusUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateStatusBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`Cập nhật trạng thái thành công!`);
                    fetch(baseUrl)
                        .then((response) => response.json())
                        .then((data) => setMixes(data.data))
                        .catch((error) => console.log(error.message));
                    handleCloseEditDialog();
                } else {
                    throw new Error('Cập nhật trạng thái không thành công.');
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const formik = useFormik({
        initialValues: {
            ngayChoPhoi: selectedMix ? selectedMix.ngayChoPhoi : '',
            ngayCoTrung: selectedMix ? selectedMix.ngayCoTrung : '',
            ngayTrungNo: selectedMix ? selectedMix.ngayTrungNo : '',
            soTrung: selectedMix ? selectedMix.soTrung : '',
            soTrungNo: selectedMix ? selectedMix.soTrungNo : '',
            soTrungHong: selectedMix ? selectedMix.soTrungHong : '',
            soChimGiao: selectedMix ? selectedMix.soChimGiao : '',
            giaTien: selectedMix ? selectedMix.giaTien : '',
            daThanhToan: selectedMix ? selectedMix.daThanhToan : '',
            conLai: selectedMix ? selectedMix.conLai : '',
        },
        validationSchema,
        onSubmit: (values) => {

        },
    });

    const [formData, setFormData] = useState({
        ngayChoPhoi: '',
        ngayCoTrung: '',
        ngayTrungNo: '',
        soTrung: '',
        soTrungNo: '',
        soTrungHong: '',
        soChimGiao: '',
        giaTien: '',
        daThanhToan: '',
        conLai: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/GetAllPhoiChim')
            .then(response => response.json())
            .then(data => {
                const responseData = data.data; // Điều chỉnh theo cấu trúc thực tế của API
                setFormData({
                    ngayChoPhoi: responseData.ngayChoPhoi || '',
                    ngayCoTrung: responseData.ngayCoTrung || '',
                    ngayTrungNo: responseData.ngayTrungNo || '',
                    soTrung: responseData.soTrung || '',
                    soTrungNo: responseData.soTrungNo || '',
                    soTrungHong: responseData.soTrungHong || '',
                    soChimGiao: responseData.soChimGiao || '',
                    giaTien: responseData.giaTien || '',
                    daThanhToan: responseData.daThanhToan || '',
                    conLai: responseData.conLai || '',
                });

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
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
                        <MenuItem value="all">Tất Cả</MenuItem>
                        <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                        <MenuItem value="2">Đã Xác Nhận</MenuItem>
                        <MenuItem value="3">Đã Hủy</MenuItem>
                        <MenuItem value="4">Thành Công</MenuItem>
                        <MenuItem value="5">Phối Thành Công</MenuItem>
                        <MenuItem value="6">Phối Thất Bại</MenuItem>
                        <MenuItem value="7">Đang Ấp Trứng</MenuItem>
                        <MenuItem value="8">Đã Nở Trứng</MenuItem>
                    </Select>
                    <TableContainer component={Paper} className="dashboard-container">
                        <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Phối Giống</h2>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="mix-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">ID</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Chim khách hàng mang tới</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Chim của trang trại</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center">Trạng Thái</TableCell>
                                    <TableCell style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }} align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slicedMixes.map((mix) => (
                                    <TableRow key={mix.id}>
                                        <TableCell style={{ fontSize: '13px' }} align="center">{mix.id}</TableCell>
                                        <TableCell style={{ fontSize: '13px' }} align="center">{mix.bird_KH?.name}</TableCell>
                                        <TableCell style={{ fontSize: '13px' }} align="center">{mix.bird_Shop?.name}</TableCell>
                                        <TableCell style={{ fontSize: '14px', fontWeight: 'bold' }} align="center">{getStatusName(mix.phoiGiongStatus)}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                color="success"
                                                className="edit-btn"
                                                onClick={() => {
                                                    handleOpenEditDialog(mix);
                                                }}
                                            >
                                                <EditIcon sx={{ fontSize: 25 }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={sortedMixes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </Box>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Mix</DialogTitle>
                <DialogContent>
                    <p style={{ marginTop: '10px' }}>ID: {selectedMix?.id}</p>
                    <TextField
                        label="Ngày Cho Phối"
                        id="ngayChoPhoi"
                        type="date"
                        {...formik.getFieldProps('ngayChoPhoi')}
                        fullWidth
                        error={formik.touched.ngayChoPhoi && Boolean(formik.errors.ngayChoPhoi)}
                        helperText={formik.touched.ngayChoPhoi && formik.errors.ngayChoPhoi}
                    />
                    <TextField
                        label="Ngày Có Trứng"
                        id="ngayCoTrung"
                        type="date"
                        {...formik.getFieldProps('ngayCoTrung')}
                        fullWidth
                    />
                    <TextField
                        label="Ngày Trứng nở"
                        id="ngayTrungNo"
                        type="date"
                        {...formik.getFieldProps('ngayTrungNo')}
                        fullWidth
                    />
                    <TextField
                        label="Số Trứng"
                        id="soTrung"
                        type="number"
                        {...formik.getFieldProps('soTrung')}
                        fullWidth
                    />
                    <TextField
                        label="Số Trứng Nở"
                        id="soTrungNo"
                        type="number"
                        value={formik.values.soTrungNo}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Số Trứng Hỏng"
                        id="soTrungHong"
                        type="number"
                        value={formik.values.soTrungHong}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Giá Tiền"
                        id="giaTien"
                        type="number"
                        value={formik.values.giaTien}
                        onChange={formik.handleChange}
                        helperText={formik.touched.giaTien && formik.errors.giaTien}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={selectedDialogStatus}
                            label="Status"
                            onChange={(e) => setSelectedDialogStatus(e.target.value)}
                        >
                            <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                            <MenuItem value="2">Đã Xác Nhận</MenuItem>
                            <MenuItem value="3">Đã Hủy</MenuItem>
                            <MenuItem value="4">Thành Công</MenuItem>
                            <MenuItem value="5">Phối Thành Công</MenuItem>
                            <MenuItem value="6">Phối Thất Bại</MenuItem>
                            <MenuItem value="7">Đang Ấp Trứng</MenuItem>
                            <MenuItem value="8">Đã Nở Trứng</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleStatusUpdate} color="primary">
                        Update Status
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default MixManager;
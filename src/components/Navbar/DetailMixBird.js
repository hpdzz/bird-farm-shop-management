import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import LoadingPage from './LoadingPage';
import Swal from 'sweetalert2';

export default function DetailMixBird() {
    const { birdID } = useParams();
    const navigate = useNavigate();
    const [getAll, setGetAll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedBird, setSelectedBird] = useState(null);
    const [isCancelDisabled, setIsCancelDisabled] = useState(true);
    const [cancellationInProgress, setCancellationInProgress] = useState(false);

    useEffect(() => {
        try {
            fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/GetAllPhoiChim`)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    setGetAll(data.data);
                    setTimeout(() => setLoading(false), 500);

                    // Handle case when the API returns null
                    if (!data.data) {
                        console.log('No items found');
                        return;
                    }

                    const selectedBirdData = data.data.find(bird => bird.bird_KH_id === birdID);
                    setSelectedBird(selectedBirdData);
                    if (!selectedBirdData) {
                        return <div>No bird found with id {birdID}</div>;
                    }

                    // Check if the status is 1 (Chờ Xác Nhận) to enable cancel button
                    setIsCancelDisabled(selectedBirdData.phoiGiongStatus !== 1);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setLoading(false);
                });
        } catch (error) {
            console.error("Error outside fetch: ", error);
        }
    }, [birdID]);

    const categoryMapping = {
        "51d334ad9f0a48a59fa4c7a20f70dcfd": "Đại bàng",
        "6a2aab32b3574510a434136b31cec3df": "Vẹt",
        "6bc3f28de70c4982b67d3bd1f0011cf2": "Chào mào",
    };

    const sexMapping = {
        true: "Male",
        false: "Female",
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

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

    const handleCancelMix = async () => {
        if (!selectedBird || cancellationInProgress) {
            // If no bird is selected or cancellation is already in progress, do nothing
            return;
        }

        // Set the cancellation in progress to true
        setCancellationInProgress(true);

        const confirmationResult = await Swal.fire({
            icon: 'question',
            title: 'Confirm Cancel',
            text: 'Are you sure you want to cancel this mix?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        });

        if (confirmationResult.isConfirmed) {
            const updateStatusUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/UpdateTrangThaiPhoiGiong?phoiGiongId=${selectedBird.id}`;

            const updateStatusBody = {
                "bird_KH_id": selectedBird.bird_KH_id,
                "bird_Shop_id": selectedBird.bird_Shop_id,
                "ngayChoPhoi": selectedBird.ngayChoPhoi,
                "ngayCoTrung": selectedBird.ngayCoTrung,
                "ngayTrungNo": selectedBird.ngayTrungNo,
                "soTrung": selectedBird.soTrung || null,
                "soTrungNo": selectedBird.soTrungNo || null,
                "soTrungHong": selectedBird.soTrungHong || null,
                "soChimGiao": selectedBird.soChimGiao || null,
                "phoiGiongStatus": 3,
                "giaTien": selectedBird.giaTien || null,
                "daThanhToan": selectedBird.daThanhToan || null,
                "conLai": selectedBird.conLai || null
            };

            try {
                const response = await fetch(updateStatusUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateStatusBody),
                });

                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Order status updated successfully.',
                    });

                    // Update the status in the state
                    setSelectedBird(prevSelectedBird => ({
                        ...prevSelectedBird,
                        phoiGiongStatus: 3, // Updated status
                    }));
                    console.log('PhoiGiongStatus updated successfully.');
                    setIsCancelDisabled(true);
                } else {
                    throw new Error('Hủy phối gặp lỗi.');
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Fail to update status.',
                });
                console.error(error.message);
            } finally {
                // Reset the cancellation in progress state, whether successful or not
                setCancellationInProgress(false);
            }
        }
    };

    return (
        <React.Fragment>
            <TableContainer style={{ marginBottom: 90 }}>
                <CssBaseline />
                <Container fixed>
                    <Box height={100} />
                    <Box sx={{ flexGrow: 1, height: '400hv' }}>

                        <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                            View Mix Bird Detail
                        </Typography>

                        <Divider />
                        <Box height={10} />
                        {loading && <LoadingPage />} {/* Display loading indicator */}
                        {!loading && !selectedBird && <Typography>No bird found with id {birdID}</Typography>} {/* Display no item message */}
                        {!loading && selectedBird && (
                            <TableContainer sx={{ maxHeight: '100%' }} style={{ marginBottom: 50 }} >
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>My Bird</TableCell>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Bird Shop </TableCell>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Bird Mix Day</TableCell>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}> Date of arrival of eggs</TableCell>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Number of eggs</TableCell>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Status</TableCell>
                                            <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Cost</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={selectedBird.id}>
                                            <TableCell align="center" key={selectedBird.bird_KH?.id}>
                                                <img src={selectedBird.bird_KH?.image ? 'http://birdsellingapi-001-site1.ctempurl.com/' + selectedBird.bird_KH.image : ''} alt={selectedBird.bird_KH?.name} style={{ width: '270px', height: '250px' }} />
                                                <Typography>Name: {selectedBird.bird_KH?.name}</Typography>
                                                <Typography>Gender: {sexMapping[selectedBird.bird_KH?.sex]}</Typography>
                                                <Typography>Category: {categoryMapping[selectedBird.bird_KH?.category_id]}</Typography>
                                            </TableCell>
                                            <TableCell align="center" key={selectedBird.bird_Shop?.id}>
                                                <img src={selectedBird.bird_Shop?.image ? 'http://birdsellingapi-001-site1.ctempurl.com/' + selectedBird.bird_Shop.image : ''} alt={selectedBird.bird_Shop?.name} style={{ width: '270px', height: '250px' }} />
                                                <Typography>Name: {selectedBird.bird_Shop?.name}</Typography>
                                                <Typography>Gender: {sexMapping[selectedBird.bird_Shop?.sex]}</Typography>
                                                <Typography>Category: {categoryMapping[selectedBird.bird_Shop?.category_id]}</Typography>
                                            </TableCell>
                                            <TableCell align="center">{formatDate(selectedBird.ngayChoPhoi)}</TableCell>
                                            <TableCell align="center">{formatDate(selectedBird.ngayCoTrung)}</TableCell>
                                            <TableCell align="center">{selectedBird.soTrung}</TableCell>
                                            <TableCell align="center">{getStatusName(selectedBird.phoiGiongStatus)}</TableCell>
                                            <TableCell align="center">{selectedBird.giaTien}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>

                    <Divider />
                    <br />

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            style={{ marginTop: '30px', marginRight: '10px' }}
                            variant="contained"
                            color="secondary"
                            onClick={handleCancelMix}
                            disabled={isCancelDisabled}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ marginTop: '30px', marginRight: '10px' }}
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/user/mybird`)}
                        >
                            Back
                        </Button>
                        <Button
                            style={{ marginTop: '30px' }}
                            onClick={() => navigate('/')}
                        >Go to Home</Button>
                    </Box>
                </Container>
            </TableContainer>
        </React.Fragment>
    );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
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
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import LoadingPage from './LoadingPage';



export default function MyBird() {
    const [loading, setLoading] = useState(true);


    const categoryMapping = {
        "51d334ad9f0a48a59fa4c7a20f70dcfd": "Đại bàng",
        "6a2aab32b3574510a434136b31cec3df": "Vẹt",
        "6bc3f28de70c4982b67d3bd1f0011cf2": "Chào mào",
    };
    const sexMapping = {
        true: "Male",
        false: "Female",
    };
    const navigate = useNavigate();
    const userID = localStorage.getItem('id');
    const [data, setData] = useState(null);
    console.log('User ID : ', userID);
    useEffect(() => {
        fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/GetProductOfUser?userID=${userID}`) // replace with your API URL
            .then(response => response.json())
            .then(data => {
                const sortedData = data.data.sort((a, b) => new Date(b.phoiGiongStatus) - new Date(a.phoiGiongStatus));
                setData(sortedData);
                console.log(sortedData);
                setTimeout(() => setLoading(false), 1000);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingPage />;
    }


    const handleViewDetail = (birdID) => {
        navigate(`/user/mybird/detail/${birdID}`);
        console.log(`View detail for bird with ID: ${birdID}`);
    }
    return (
        <React.Fragment>
            <TableContainer style={{ marginBottom: '30px' }}>
                <CssBaseline />
                <Container fixed>
                    <Box height={100} />
                    <Box sx={{ flexGrow: 1, height: '400hv' }}>

                        <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                            My Bird List
                        </Typography>
                        <Divider />
                        <Box height={10} />

                        <TableContainer sx={{ maxHeight: '100%' }} style={{ marginBottom: '100px' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>
                                            Name of bird
                                        </TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>
                                            Category
                                        </TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>
                                            Image
                                        </TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>
                                            Gender
                                        </TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>
                                            View mix details
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(data) && data.map((bird) => (
                                        <TableRow key={bird.id}>
                                            <TableCell align="center">{bird.name}</TableCell>
                                            <TableCell align="center">{categoryMapping[bird.category_id]}</TableCell>
                                            <TableCell align="center">
                                                <img src={'http://birdsellingapi-001-site1.ctempurl.com/' + bird.image} alt={bird.name} style={{ width: '90px', height: '90px' }} />
                                            </TableCell>
                                            <TableCell align="center">{sexMapping[bird.sex]}</TableCell>
                                            <TableCell align="center">
                                                <Button

                                                    color="primary"
                                                    onClick={() => handleViewDetail(bird.id)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} bounce size="xl" style={{ color: "#24e554", }} />

                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </TableContainer>
        </React.Fragment>
    );

}

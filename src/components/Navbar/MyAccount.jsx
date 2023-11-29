import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';

export default function MyAccount() {
    const { logout } = useAuth();
    const userID = localStorage.getItem('id');

    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://birdsellingapi-001-site1.ctempurl.com/api/User/GetSingleID?id=${userID}`
                );
                const data = await response.json();
                setUserData(data.data);
                // Set editData initially with the current user data
                setEditData({ ...data.data });


            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [userID]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        // Additional validation checks for all fields
        if (
            !validatePassword(editData?.userPassword) ||
            !validateEmail(editData?.userEmail) ||
            !validatePhone(editData?.userPhone)
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please correct all fields before saving.',
            });
            return;
        }

        const payload = {
            role_id: 'e78ca8b85592426aa4d981581445eeb4',
            id: editData.id,
            userName: editData.userName,
            name: editData.name,
            userPassword: editData.userPassword,
            userEmail: editData.userEmail,
            userPhone: editData.userPhone,
            addressLine: editData.addressLine,
        };

        fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/UpdateUser?id=${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                Swal.fire({
                    icon: 'success',
                    title: 'Account update successfully !!!',
                });
                setUserData(editData); // Update userData with the updated data
                setEditMode(false);
            })
            .catch(error => {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to update user. Please try again later.',
                });
            });
    };
    console.log('Password: ', editData.userPassword);
    const handleCancelClick = () => {
        // Reset the editData to discard changes
        setEditData(userData);
        setEditMode(false);
    };

    const handleLogout = async () => {
        try {
            const result = await swal.fire({
                title: 'Logout',
                text: 'Are you sure you want to logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
            });

            if (result.isConfirmed) {
                await logout();
                localStorage.removeItem('role');
                localStorage.removeItem('username');
                swal.fire('Logged Out!', 'You have been logged out.', 'success');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            swal.fire('Error', 'An error occurred during logout.', 'error');
        }
    };


    // Validation
    const validateUserName = (userName) => {
        const regex = /^(?=.*[A-Za-z0-9])[A-Za-z\d@$!%*#?&]{6,}$/;
        return regex.test(userName);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^(\+\d{1,3}(\s?|[-.])?)?(\(\d{1,3}\)(\s?|[-.])?)?\d{1,14}$/;
        return regex.test(phone);
    };

    const validateAddress = (address) => {
        return address && address.trim() !== '';
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box height={100} />
                <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                    My Account
                </Typography>
                <Divider />
                <Box height={70} />
                <Box sx={{ height: '123vh' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={6} md={9}>
                            <Box>
                                <Card sx={{ height: '75vh' }}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            {editMode ? (
                                                <>
                                                    <TextField
                                                        id='name'
                                                        label="Name"
                                                        value={editData?.name || ''}
                                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                    />

                                                    <TextField
                                                        id='userPassword'
                                                        label="Password"
                                                        type="password"
                                                        value={editData?.userPassword || ''}
                                                        onChange={(e) => setEditData({ ...editData, userPassword: e.target.value })}
                                                        error={!validatePassword(editData?.userPassword)}
                                                        helperText={
                                                            !validatePassword(editData?.userPassword) &&
                                                            'Password must have at least 8 characters, 1 uppercase letter, and 1 special character.'
                                                        }
                                                    />
                                                    <TextField
                                                        id='userPhone'
                                                        label="Phone"
                                                        value={editData?.userPhone || ''}
                                                        onChange={(e) => setEditData({ ...editData, userPhone: e.target.value })}
                                                        error={!validatePhone(editData?.userPhone)}
                                                        helperText={
                                                            !validatePhone(editData?.userPhone) &&
                                                            'Enter a valid phone number.'
                                                        }
                                                    />

                                                    <TextField
                                                        id='userEmail'
                                                        label="Email"
                                                        value={editData?.userEmail || ''}
                                                        onChange={(e) => setEditData({ ...editData, userEmail: e.target.value })}
                                                        error={!validateEmail(editData?.userEmail)}
                                                        helperText={
                                                            !validateEmail(editData?.userEmail) &&
                                                            'Enter a valid email address.'
                                                        }
                                                    />

                                                    <TextField
                                                        id='addressLine'
                                                        label="Address"
                                                        value={editData?.addressLine || ''}
                                                        onChange={(e) => setEditData({ ...editData, addressLine: e.target.value })}
                                                        error={!validateAddress(editData?.addressLine)}
                                                        helperText={
                                                            !validateAddress(editData?.addressLine) &&
                                                            'Address cannot be empty.'
                                                        }
                                                    />
                                                    <div style={{ justifyContent: 'right', display: 'flex' }}>
                                                        <Stack spacing={2} direction="row">
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleCancelClick}
                                                                style={{ width: 100 }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleSaveClick}
                                                                style={{ width: 100 }}

                                                            >
                                                                Save
                                                            </Button>
                                                        </Stack>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="h6" gutterBottom>
                                                        Your Information
                                                    </Typography>
                                                    <Divider />
                                                    <br />
                                                    <Typography variant="h6" gutterBottom>
                                                        UserName: {userData?.userName}
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        Name: {userData?.name}
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        Phone: {userData?.userPhone}
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        Email: {userData?.userEmail}
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        Address: {userData?.addressLine}
                                                    </Typography>
                                                </>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Card sx={{ height: '75vh', bgcolor: '#42e46b2c' }}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Action
                                        </Typography>
                                        <Divider />
                                        <br />
                                        <Button
                                            variant="contained"
                                            startIcon={<ShoppingCartIcon />}
                                        >
                                            <Link to="/cart">My cart</Link>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<AssignmentIcon />}
                                        >
                                            <Link to="/user/mybird">My bird list</Link>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<AssignmentIcon />}
                                        >
                                            <Link to="/user/order">My order</Link>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            onClick={handleEditClick}
                                        >
                                            Edit Profile
                                        </Button>
                                        <br />
                                        <Divider />
                                        <Button
                                            variant="contained"
                                            startIcon={<LogoutIcon />}
                                            onClick={handleLogout}
                                        >
                                            Log out
                                        </Button>
                                    </Stack>
                                    <br />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';

// Validation functions
const validateUsername = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{6,})$/;
    return regex.test(value);
};

const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
};

const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};




const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
};
// Addresses
// Addresses    can contain only letters, numbers, dashes, and spaces   must be between 5 and 60 characters    must not contain spaces at the beginning or end       
const validateAddress = (value) => {
    return value != null && value.trim() !== '';
};

const EditUser = ({ userData, closeEvent, refreshUserList }) => {
    const [editedUser, setEditedUser] = useState({ ...userData });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setEditedUser({ ...userData });
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleUpdateUser = () => {
        // Validate all fields
        if (
            !validateUsername(editedUser.userName) ||
            !validatePassword(editedUser.userPassword) ||
            !validateEmail(editedUser.userEmail) ||
            !validatePhone(editedUser.userPhone)
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi định dạng',
                text: 'Vui lòng điền đúng yêu cầu trước khi cập nhật .',
            });
            return;
        }

        // Proceed with the update
        // const { id, role_id, createdAt, address_id } = editedUser;
        const { id, role_id } = editedUser;
        const payload = {
            role_id: role_id,
            id: editedUser.id,
            userName: editedUser.userName,
            userPassword: editedUser.userPassword,
            userEmail: editedUser.userEmail,
            userPhone: editedUser.userPhone,
            addressLine: editedUser.addressLine,

        };

        fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/UpdateUser?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                console.log('API response status:', response.status);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('API response:', data);
                closeEvent();
                refreshUserList();
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật tài khoản thành công !!!',
                });
            })
            .catch((error) => {
                console.error('Error making API call:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Không thể cập nhật người dùng. Vui lòng thử lại sau.',
                });
            });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Edit User
            </Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <br />
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        error={!validateUsername(editedUser.userName)}
                        id="outlined-error-helper-text"
                        label="User Name"
                        name="userName"
                        value={editedUser.userName}
                        onChange={handleInputChange}
                        helperText={
                            !validateUsername(editedUser.userName) &&
                            'User Name must have at least 6 characters, 1 number, and 1 special character.'
                        }
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        error={!validatePassword(editedUser.userPassword)}
                        id="outlined-error-helper-text"
                        label="User Password"
                        name="userPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={editedUser.userPassword}
                        onChange={handleInputChange}
                        helperText={
                            !validatePassword(editedUser.userPassword) &&
                            'Password must have at least 8 characters, 1 uppercase letter, and 1 special character.'
                        }
                        sx={{ minWidth: '100%' }}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        error={!validateEmail(editedUser.userEmail)}
                        id="outlined-error-helper-text"
                        label="User Email"
                        name="userEmail"
                        value={editedUser.userEmail}
                        onChange={handleInputChange}
                        helperText={!validateEmail(editedUser.userEmail) && 'Không đúng định dạng email !!!'}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        error={!validatePhone(editedUser.userPhone)}
                        id="outlined-error-helper-text-phone"
                        label="User Phone"
                        name="userPhone"
                        value={editedUser.userPhone}
                        onChange={handleInputChange}
                        helperText={!validatePhone(editedUser.userPhone) && 'Enter a valid phone number.'}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!validateAddress(editedUser.addressLine)}
                        id="outlined-error-helper-text-address"
                        label="User Address"
                        name="addressLine"
                        value={editedUser.addressLine}
                        onChange={handleInputChange}
                        helperText={!validateAddress(editedUser.addressLine) && 'Enter a valid address.'}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        {/* <Button variant="contained" onClick={handleUpdateUser}> */}
                        <Button variant="contained" onClick={() => handleUpdateUser(editedUser.id)}>
                            Update
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    );
};

export default EditUser;

import React, { useState } from 'react';
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

const EditUser = ({ userData, closeEvent, refreshUserList }) => {
    //INPUT EVENT
    const [editedUser, setEditedUser] = useState({ ...userData });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleUpdateUser = () => {
        const { id, role_id } = editedUser;

        const payload = {
            id: editedUser.id,
            userName: editedUser.userName,
            userPassword: editedUser.userPassword,
            userEmail: editedUser.userEmail,
            userPhone: editedUser.userPhone,
            role_id: role_id,
        };
        console.log('Request Payload:', JSON.stringify(payload));

        fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/UpdateProduct?id=${id}`, {
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

    //UserName
    const validateUsername = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{6,})$/;
        return regex.test(value);
    };
    //userPassword
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    //userEmail
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    //User Phone
    const validatePhone = (value) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
    };
    // Addresses
    // const validateAddress = (value) => {
    //     return value != null && value.trim() !== '';
    // };

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
            <Grid contatter spacing={2}>
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
                            'User Name phải có ít nhất 6 ký tự, ít nhất 1 số và ít nhất 1 ký tự đặc biệt.'
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
                            'Password phải có ít nhất 8 ký tự , 1 ký tự viết hoa và 1 ký tự đặc biệt'
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
                        helperText={!validatePhone(editedUser.userPhone) && 'Số điện thoại không hợp lệ'}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <br />
                {/* <Grid item xs={12}>
                    <TextField
                        error={!validateAddress(editedUser.addressLine)}
                        id="outlined-error-helper-text-address"
                        label="User Address"
                        name='addressLine'
                        value={editedUser.addressLine}
                        onChange={handleInputChange}
                        helperText={!validateAddress(editedUser.addressLine) && 'Address không được trống !'}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid> */}
                <br />

                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
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

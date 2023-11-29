import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';

export default function AddUser({ closeEvent, refreshUserList }) {
    //UserName
    const [userName, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{6,})$/;
        if (!regex.test(value)) {
            setUsernameError('User Name phải có ít nhất 6 ký tự, ít nhất 1 số và ít nhất 1 ký tự đặc biệt.');
        } else {
            setUsernameError('');
        }
    };
    //userPassword
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleUserPassword = (event) => {
        const password = event.target.value;
        setUserPassword(password);

        // Validate password using regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setPasswordError('Password phải có ít nhất 8 ký tự , 1 ký tự viết hoa và 1 ký tự đặc biệt');
        } else {
            setPasswordError('');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    //userEmail
    const [userEmail, setUserEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleUserEmail = (event) => {
        const email = event.target.value;
        setUserEmail(email);

        // Validate email using a simple regex (you might want to use a more robust one)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError('Không đúng định dạng email !!!');
        } else {
            setEmailError('');
        }
    };

    /// Role id
    const [role_id, setRole] = React.useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    //User Phone
    const [userPhone, setUserPhone] = useState('');
    const [userPhoneError, setUserPhoneError] = useState('');
    const handleUserPhoneChange = (event) => {
        const value = event.target.value;
        setUserPhone(value);

        // Your validation logic for user phone
        // ...

        // For example, checking if the user phone follows a specific pattern
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        if (!phoneRegex.test(value)) {
            setUserPhoneError('Số điện thoại không hợp lệ');
        } else {
            setUserPhoneError('');
        }
    };

    // Addresses
    const [addressLine, setAddressLine] = useState('');
    const [addressError, setAddressError] = useState('');
    const handleUserAddressChange = (event) => {
        const value = event.target.value;
        setAddressLine(value);

        // Your validation logic for the address field
        // ...

        // For example, checking if the address is not empty
        if (!value.trim()) {
            setAddressError('Address không được trống !');
        } else {
            setAddressError('');
        }
    };
    //Handle SUBMIT event

    const handleSubmit = async () => {
        //validate
        if (!userName || !userPassword || !role_id || !userEmail || !userPhone) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields.',
            });
            closeEvent();
            return;
        }

        const requestData = {
            userName: userName,
            userPassword: userPassword,
            role_id: role_id,
            userEmail: userEmail,
            userPhone: userPhone,
            addressLine: addressLine,
        };

        try {
            // Make the API request using the fetch function
            const response = await fetch('http://birdsellingapi-001-site1.ctempurl.com/api/Auth/SignUpUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                body: JSON.stringify(requestData),
            });

            // Check if the request was successful (status code 200-299)
            if (response.ok) {
                // Parse the response JSON if applicable
                const responseData = await response.json();
                console.log('API Response:', responseData);
                closeEvent();
                refreshUserList();
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo tài khoản thành công !!!',
                });
            } else if (response.status === 400) {
                const errorData = await response.json();
                console.error('API Error:', errorData);

                // Display error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.messageError || 'An unexpected error occurred.',
                });
            } else {
                // Handle other error scenarios
                console.error('API Error:', response.statusText);
            }
        } catch (error) {
            console.error('API Request Failed:', error.message);
        }
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Add User
            </Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <br />
            <Box height={20} />
            <Grid contatter spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        error={!!usernameError}
                        id="outlined-error-helper-text"
                        label="User Name"
                        value={userName}
                        onChange={handleUsernameChange}
                        helperText={usernameError || ' '}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!passwordError}
                        id="outlined-error-helper-text"
                        label="User Password"
                        type={showPassword ? 'text' : 'password'}
                        value={userPassword}
                        onChange={handleUserPassword}
                        helperText={passwordError || ' '}
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
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role_id}
                            label="Role Name"
                            onChange={handleChange}
                        >
                            <MenuItem value={'190f2b3c66db4405afb29ec0bd9cfed2'}>Admin</MenuItem>
                            <MenuItem value={'507cd3255f5e4e2589d999efa128dd0a'}>Manager</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        error={!!emailError}
                        id="outlined-error-helper-text"
                        label="User Email"
                        value={userEmail}
                        onChange={handleUserEmail}
                        helperText={emailError || ' '}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!userPhoneError}
                        id="outlined-error-helper-text-phone"
                        label="User Phone"
                        value={userPhone}
                        onChange={handleUserPhoneChange}
                        helperText={userPhoneError || ' '}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!addressError}
                        id="outlined-error-helper-text-address"
                        label="User Address"
                        value={addressLine}
                        onChange={handleUserAddressChange}
                        helperText={addressError || ' '}
                        sx={{ minWidth: '100%' }}
                        size="small"
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        <Button variant="contained" size="medium" onClick={handleSubmit}>
                            ADD USER
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    );
}

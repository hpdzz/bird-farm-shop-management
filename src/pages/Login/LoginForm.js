import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import swal from 'sweetalert2';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { fetchAllCart, updateCart } from '../../redux/cartSlice';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Bird Farm Shop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function Login() {
    const { login, error } = useAuth();
    const dispatch = useDispatch();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userName.trim() || !userPassword.trim()) {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter both username and password!',
            });
            return;
        }
        login(userName, userPassword);
    };

    useEffect(() => {
        if (error) {
            swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: error,
            });
        }
    }, [error]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            error={!!usernameError}
                            id="outlined-error-helper-text"
                            fullWidth
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            helperText={usernameError || ' '}
                            value={userName}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            error={!!passwordError}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="User Password"
                            type={showPassword ? 'text' : 'password'}
                            id="outlined-error-helper-text"
                            autoComplete="new-password"
                            value={userPassword}
                            onChange={handleUserPassword}
                            helperText={passwordError || ' '}
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
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        {/* {error} */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

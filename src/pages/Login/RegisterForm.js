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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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

export default function Register() {
    const navigate = useNavigate();


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



    const handleSubmit = async (event) => {
        event.preventDefault();
        //validate
        if (!userName || !userPassword || !userEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields.',
            });
            return;
        }
        const requestData = {
            userName: userName,
            userPassword: userPassword,
            userEmail: userEmail,
            role_id: 'e78ca8b85592426aa4d981581445eeb4',
        };

        try {
            // Make the API request using the fetch function
            const response = await fetch('http://birdsellingapi-001-site1.ctempurl.com/api/Auth/SignUpUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            if (response.ok) {

                const responseData = await response.json();
                console.log('API Response:', responseData);
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo tài khoản thành công !!!',
                });
                navigate('/login');
            }

        } catch (error) {
            console.error('API Request Failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Failed to create account. ${error.message}`,
            });
        }
    };

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
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                        <TextField
                            margin="normal"
                            error={!!usernameError}

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
                        <TextField
                            required
                            autoComplete="email"
                            margin="normal"
                            fullWidth
                            error={!!emailError}

                            label="User Email"
                            value={userEmail}
                            onChange={handleUserEmail}
                            helperText={emailError || ' '}


                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="I agree to the terms and conditions"
                        />
                        <input type="hidden" name="role_id" value="e78ca8b85592426aa4d981581445eeb4" />

                        <Button type="submit"
                            fullWidth
                            variant="contained" sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}>
                            Register
                        </Button>


                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {'Already have an account? Sign In'}
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

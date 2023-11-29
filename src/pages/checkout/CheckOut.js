import React from 'react';
import AddressForm from './AddressForm';
import Review from './Review';
import { AppBar, Button, CssBaseline, Paper, Step, StepLabel, Stepper, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const steps = ['Shipping address', 'Review your order'];

function getStepContent(step, handleShippingInfoChange, shippingInfo) {
    switch (step) {
        case 0:
            return <AddressForm onShippingInfoChange={handleShippingInfoChange} />;
        case 1:
            return <Review shippingInfo={shippingInfo} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [shippingInfo, setShippingInfo] = React.useState({});
    const location = useLocation();
    const selectedProducts = location.state?.selectedProducts || [];

    const handlePlaceOrder = async () => {
        const userId = localStorage.getItem('id');
        try {
            const orderData = {
                listIDCarts: selectedProducts.map((product) => product.id),
                user_id: userId,
                paymentMenthod_id: '89f5deddc7984625885c9055ebb0ca2a',
                address: shippingInfo.address,
            };

            const response = await axios.post(
                'http://birdsellingapi-001-site1.ctempurl.com/api/Order/Create-Order',
                orderData,
            );
            Swal.fire({
                icon: 'success',
                title: 'Successful order. Keep buying!',
            });
            navigate('/');
            console.log('Order created successfully:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    // const handleNext = () => {
    //     if (activeStep === steps.length - 1) {
    //         handlePlaceOrder();
    //     } else {
    //         setActiveStep(activeStep + 1);
    //     }
    // };
    const isShippingInfoComplete = () => {
        const { firstName, lastName, address, phone, city, country } = shippingInfo;
        return firstName && lastName && address && phone && city && country;
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handlePlaceOrder();
        } else {
            if (isShippingInfoComplete()) {
                setActiveStep(activeStep + 1);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Please fill in all shipping information',
                });
            }
        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleShippingInfoChange = (newInfo) => {
        setShippingInfo(newInfo);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order confirmation, and will send
                                you an update when your order has shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, handleShippingInfoChange, shippingInfo)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}

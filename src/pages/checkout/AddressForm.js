import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AddressForm({ onShippingInfoChange }) {
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        city: '',
        country: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = name === 'phone' ? value.replace(/\D/g, '') : value;

        setShippingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: numericValue,
        }));
    };
    useEffect(() => {
        onShippingInfoChange(shippingInfo);
    }, [onShippingInfoChange, shippingInfo]);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address "
                        fullWidth
                        autoComplete="shipping address-line"
                        variant="standard"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        fullWidth
                        autoComplete="phone address-line"
                        variant="standard"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

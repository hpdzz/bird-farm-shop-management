import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import axios from 'axios';  // Import axios for making API calls

export default function FeedbackComponent({ cartsData, onClose }) {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const details = await Promise.all(
                cartsData.map(async (cart) => {
                    // Make a request to the API for each product_id
                    const response = await axios.get(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${cart.product_id}`);
                    return response.data.data;  // Assuming the API response contains the product details
                })
            );

            setProductDetails(details);
        };
        fetchData();
    }, [cartsData]);

    console.log('productDetails', productDetails);

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                    Feedback
                </Typography>
                <Divider />
                <br />
                <Typography variant="h6" gutterBottom>
                    Đánh giá của bạn về sản phẩm
                </Typography>
                <br />
                <>
                    {productDetails.map((product, index) => (
                        <div key={index}>
                            <p>{product.product_id}</p>
                            <p>{product.name}</p>
                            {/* Render other product details as needed */}
                        </div>
                    ))}
                </>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{ fontSize: 16, width: '173px' }} variant="contained" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </Stack>
        </div>
    );
}

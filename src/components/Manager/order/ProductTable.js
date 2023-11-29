// ProductTable.js
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProductTable = ({ carts }) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = await Promise.all(
                carts.map(async (cart) => {
                    const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${cart.product_id}`);
                    const data = await response.json();
                    const updatedCart = { ...cart, productName: data.data.name, productImage: data.data.image, sex: data.data.sex };
                    return updatedCart;
                })
            );

            setProductDetails(details);
        };

        fetchProductDetails();
    }, [carts]);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Sex</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productDetails.map((cart) => (
                        <TableRow key={cart.id}>
                            <TableCell>
                                <img src={'http://birdsellingapi-001-site1.ctempurl.com/' + cart.productImage} alt={cart.productName} style={{ width: '50px', height: '50px' }} />
                            </TableCell>
                            <TableCell>{cart.productName}</TableCell>
                            <TableCell>{cart.sex ? 'Male' : 'Female'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;

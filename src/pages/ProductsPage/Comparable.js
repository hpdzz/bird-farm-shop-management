import React from 'react';
import './Products.scss';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

const CompareTable = ({ products, onClose }) => {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Comparison</DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Discount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.discount}%</TableCell>
                                    <TableCell>{product.day_of_birth}</TableCell>
                                    <TableCell>{product.sex === true ? 'Male' : 'Female'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
export default CompareTable;

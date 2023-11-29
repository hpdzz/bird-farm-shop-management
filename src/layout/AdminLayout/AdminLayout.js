import React from 'react';
import Navbar from '../../components/Admin/NavbarAdmin/NavbarAdmin';
import { Box } from '@mui/material';
import SideNav from '../../components/Admin/SideNav/SideNav';

const AdminLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {/* <Box height={70} /> */}
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                </Box>
            </Box>
        </div>
    );
};

export default AdminLayout;

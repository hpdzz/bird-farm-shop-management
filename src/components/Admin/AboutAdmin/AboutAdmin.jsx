import React from 'react';
import SideNav from '../../Admin/SideNav/SideNav';
import Box from '@mui/material/Box';
// import Navbar from '../components/Navbar';

function AboutAdmin() {
    return (
        <>
            {/* <Navbar /> */}
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>About</h1>
                </Box>
            </Box>
        </>
    );
}

export default AboutAdmin;

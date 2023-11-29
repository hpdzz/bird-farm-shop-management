import React from 'react';
import SideNav from '../SideNav/SideNav';
import Box from '@mui/material/Box';

import UserList from '../UserCRUD/UserList';
export default function UserAdmin() {
    return (
        <>
            {/* <Navbar /> */}
            <Box height={80} />
            <Box sx={{ display: 'flex' }}>
                {/* <SideNav /> */}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                    style={{ position: 'absolute', left: '15%', width: '85%', top: '10%' }}
                >
                    <UserList />
                </Box>
            </Box>
        </>
    );
}

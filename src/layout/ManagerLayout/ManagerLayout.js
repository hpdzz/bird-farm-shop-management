import React from 'react';
// import SidebarManager from '../../components/Manager/SideBarManager/SidebarManager';
import AppBarManager from '../../components/Manager/AppBarManager/AppBarManager';
const ManagerLayout = ({ children }) => {
    return (
        <div>
            <AppBarManager />
            {/* <SidebarManager /> */}
            {children}
        </div>
    );
};

export default ManagerLayout;

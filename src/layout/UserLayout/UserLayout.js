import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const UserLayout = ({ children }) => {
    return (
        <div className="wrap">
            <Navbar />

            <div className="container">{children}</div>
            <Footer />
        </div>
    );
};

export default UserLayout;

import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            Bạn không có quyền
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Unauthorized;

import React, { useEffect, useState } from 'react';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../StyleManager/accountManager.css';
import { toast } from 'react-toastify';

const apiUrlBase = 'http://birdsellingapi-001-site1.ctempurl.com/api/User/GetSingleID?id=';

function AccountManager() {
    const [account, setAccount] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (!id) {
            console.error('User ID not found in local storage');
            return;
        }

        const apiUrl = `${apiUrlBase}${id}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data.data);
                setEditData({
                    ...data.data,
                });
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditData(account);
        setConfirmPassword(''); // Reset confirm password on cancel
        setEditMode(false);
    };

    const handleSaveClick = () => {
        // Validation
        if (
            !validateEmail(editData?.userEmail) ||
            !validatePassword(editData?.userPassword)
        ) {
            toast.error('Please fix validation errors before saving.');
            return;
        }

        const payload = {
            role_id: editData.role_id,
            id: editData.id,
            userName: editData.userName,
            name: editData.name,
            userPassword: editData.userPassword,
            userEmail: editData.userEmail,
            userPhone: editData.userPhone,
            addressLine: editData.addressLine,
        };

        fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/UpdateUser?id=${editData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                setAccount(editData);
                setEditMode(false);
                setConfirmPassword(''); // Reset confirm password on successful save
                toast.success('Updated successfully');
            })
            .catch((error) => {
                console.error('Error updating user:', error);
                // Handle error, show a message, etc.
            });
    };

    const handleInputChange = (fieldName, value) => {
        if (fieldName === 'userPassword') {
            setEditData({
                ...editData,
                userPassword: value,
            });
        } else if (fieldName === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setEditData({
                ...editData,
                [fieldName]: value,
            });
        }
    };

    // Validation functions
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        // Define your password validation logic
        // Example: Password must have at least 8 characters, 1 uppercase letter, and 1 special character.
        const regex = /^(.{8,})$/;
        return regex.test(password);
    };

    if (!account) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarManager />
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                <AppBarManager />
                <div className="main-container">
                    <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Thông Tin Tài Khoản</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <tbody>
                            <tr>
                                <td className="label">User Name:</td>
                                <td className="value">{account.userName}</td>
                            </tr>
                            <tr>
                                <td className="label">Email:</td>
                                <td className="value">
                                    {editMode ? (
                                        <TextField
                                            value={editData?.userEmail || ''}
                                            onChange={(e) => handleInputChange('userEmail', e.target.value)}
                                            error={!validateEmail(editData?.userEmail)}
                                            helperText={
                                                !validateEmail(editData?.userEmail) &&
                                                'Enter a valid email address.'
                                            }
                                        />
                                    ) : (
                                        account.userEmail
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Password:</td>
                                <td className="value">
                                    {editMode ? (
                                        <TextField
                                            type='password'
                                            value={editData.userPassword}
                                            onChange={(e) => handleInputChange('userPassword', e.target.value)}
                                            error={!validatePassword(editData?.userPassword)}
                                            helperText={
                                                !validatePassword(editData?.userPassword) &&
                                                '8 characters required'
                                            }
                                        />
                                    ) : (
                                        '******'
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Phone number:</td>
                                <td className="value">
                                    {editMode ? (
                                        <TextField
                                            value={editData?.userPhone || ''}
                                            onChange={(e) => handleInputChange('userPhone', e.target.value)}
                                        />
                                    ) : (
                                        account.userPhone
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Address:</td>
                                <td className="value">
                                    {editMode ? (
                                        <TextField
                                            value={editData?.addressLine || ''}
                                            onChange={(e) => handleInputChange('addressLine', e.target.value)}
                                        />
                                    ) : (
                                        account.addressLine
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {editMode ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button variant="contained" onClick={handleSaveClick}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleCancelClick} style={{ marginLeft: '10px' }}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button variant="contained" onClick={handleEditClick}>
                                Edit
                            </Button>
                        </div>
                    )}
                </div>
            </Box>
        </Box>
    );
}

export default AccountManager;

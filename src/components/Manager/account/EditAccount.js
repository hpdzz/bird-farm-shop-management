import React, { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, Box } from '@mui/material';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/User/UpdateUser?id=';

const EditAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAccountData(data.data))
      .catch((error) => console.error(error));
  }, []);

  const validationSchema = yup.object().shape({
    userPassword: yup.string().optional('Tên đăng nhập là bắt buộc'),
    userEmail: yup.string().email('Email không hợp lệ').optional('Email là bắt buộc'),
    userPhone: yup.string().optional('Số điện thoại là bắt buộc'),
    addressLine: yup.string().optional('Địa chỉ là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: accountData,
    validationSchema,
    onSubmit: (values) => {
      const updatedAccount = {
        userName: values.userName,
        userPassword: values.userPassword,
        userEmail: values.userEmail,
        userPhone: values.userPhone,
        addressLine: values.addressLine,
      };
      fetch(`apiUrl${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAccount),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Chỉnh sửa user thành công!');
            navigate('/manager/account');
          } else {
            console.error('Lỗi khi cập nhật user.');
            toast.error('Lỗi khi cập nhật user.');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật user:', error);
          toast.error('Lỗi khi cập nhật user.');
        });
    },
  });

  if (!accountData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarManager />
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarManager />
        <div className="main-container">
          <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Chỉnh Sửa Tài Khoản</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                fullWidth
                id="userName"
                label="Tên đăng nhập"
                variant="filled"
                value={formik.values.userName}
                onChange={formik.handleChange}
                name="userName"
                disabled
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="userEmail"
                label="Email"
                variant="filled"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                name="userEmail"
                error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                helperText={formik.touched.userEmail && formik.errors.userEmail}
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="userPhone"
                label="Số điện thoại"
                variant="filled"
                value={formik.values.userPhone}
                onChange={formik.handleChange}
                name="userPhone"
                error={formik.touched.userPhone && Boolean(formik.errors.userPhone)}
                helperText={formik.touched.userPhone && formik.errors.userPhone}
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="addressLine"
                label="Địa chỉ"
                variant="filled"
                value={formik.values.addressLine}
                onChange={formik.handleChange}
                name="addressLine"
                error={formik.touched.addressLine && Boolean(formik.errors.addressLine)}
                helperText={formik.touched.addressLine && formik.errors.addressLine}
              />
            </div>
            <div className="form-group">
              <div className="update-btn">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Lưu
                </Button>
              </div>
              <div className="cancel-btn">
              <Link to="/manager/account">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => toast.warning('Hủy chỉnh sửa sản phẩm')}
                      >
                        Hủy
                      </Button>
                    </Link>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Box>
  );
};

export default EditAccount;

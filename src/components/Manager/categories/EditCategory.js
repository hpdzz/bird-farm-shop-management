import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import Box from '@mui/material/Box';

const apiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/BirdCategory';

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');

  const validationSchema = yup.object().shape({
    category_name: yup.string().required('Tên danh mục là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      category_name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`${apiUrl}/UpdateBirdCategory?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, category_name: values.category_name }),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Cập nhật danh mục thành công!');
            navigate('/manager/categories');
          } else {
            console.log('Cập nhật danh mục không thành công.');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật danh mục:', error);
          toast.error('Lỗi khi cập nhật danh mục.');
        });
    },
  });

  useEffect(() => {
    fetch(`${apiUrl}/GetSingleID?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryName(data.data.category_name);
        formik.setValues({
          category_name: data.data.category_name,
        });
      })
      .catch((error) => console.log(error.message));
  }, [id]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarManager />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <AppBarManager />
      <div className="main-edit-category">
        <form className="add-container" onSubmit={formik.handleSubmit}>
          <div className="add-form">
            <div className="form-title">
              <h2>Chỉnh Sửa Danh Mục</h2>
            </div>
            <div className="form-body">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="category_name"
                  label="Tên danh mục"
                  variant="filled"
                  value={formik.values.category_name}
                  onChange={formik.handleChange}
                  name="category_name"
                  error={formik.touched.category_name && Boolean(formik.errors.category_name)}
                  helperText={formik.touched.category_name && formik.errors.category_name}
                />
              </div>
              <div className="form-group">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Lưu
                </Button>
                <Link to="/manager/categories">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => toast.warning('Hủy thêm danh mục')}
                  >
                    Hủy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      </Box>
    </Box>
  );
}

export default EditCategory;

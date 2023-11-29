import React, { useState, useEffect } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import Box from '@mui/material/Box';

const categoriesApiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/BirdCategory/GetAll';
const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Product/CreateProduct';

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch(categoriesApiUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().max(30, 'Tên phải ít hơn hoặc bằng 30 ký tự').required('Tên là bắt buộc'),
    price: yup
      .number()
      .typeError('Giá phải là số')
      .positive('Giá phải là số dương')
      .min(1, 'Giá phải lớn hơn hoặc bằng 1')
      .required('Giá là bắt buộc'),
    sex: yup.string().required('Giới tính là bắt buộc'),
    description: yup.string().required('Thông tin là bắt buộc'),
    dayOfBirth: yup.string().optional('Ngày sinh là bắt buộc'),
    category_id: yup.string().required('Danh mục là bắt buộc'),
    image: yup.mixed().required('Hãy chọn hình ảnh'),
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      image: null,
      price: 0,
      name: '',
      sex: 'true',
      description: '',
      discount: 0,
      dayOfBirth: new Date().toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append each field to the FormData object
      formData.append('category_id', values.category_id);
      formData.append('imageFiles', values.image); // Assuming values.image is a File object
      formData.append('price', values.price);
      formData.append('name', values.name);
      formData.append('sex', values.sex);
      formData.append('description', values.description);
      formData.append('bird_mother_id', values.bird_mother_id);
      formData.append('bird_father_id', values.bird_father_id);
      formData.append('Discount', values.discount);
      formData.append('TypeProduct', 1); // Example value, adjust accordingly
      formData.append('statusProduct', 1); // Example value, adjust accordingly
      formData.append('day_of_birth', values.dayOfBirth);
      formData.append('userId', 'user123'); // Example value, replace with actual user ID

      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Thêm sản phẩm thành công!');
          navigate('/manager/products');
        } else {
          toast.error('Lỗi khi thêm sản phẩm');
        }
      } catch (error) {
        toast.error('Lỗi khi thêm sản phẩm');
        console.error(error);
      }
    },
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarManager />
      <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
        <AppBarManager />
        <div className="main">
          <form className="add-container" onSubmit={formik.handleSubmit}>
            <div className="add-form">
              <div className="form-title">
                <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '25px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Thêm Sản Phẩm Mới</h2>
              </div>
              <div className="form-body">
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="name"
                    label="Tên"
                    variant="filled"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="price"
                    label="Giá"
                    variant="filled"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    name="price"
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </div>
                <div className="form-group">
                  <FormLabel id="sex">Giới tính</FormLabel>
                  <RadioGroup
                    required
                    name="sex"
                    value={formik.values.sex}
                    onChange={formik.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio color="primary" />}
                      label="Female"
                    />
                  </RadioGroup>
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="description"
                    label="Thông tin"
                    variant="filled"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    name="description"
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="discount"
                    label="Giảm Giá"
                    variant="filled"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    name="discount"
                    error={formik.touched.discount && Boolean(formik.errors.discount)}
                    helperText={formik.touched.discount && formik.errors.discount}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="dayOfBirth"
                    label="Ngày sinh"
                    variant="filled"
                    type="date"
                    value={formik.values.dayOfBirth}
                    onChange={formik.handleChange}
                    name="dayOfBirth"
                    error={formik.touched.dayOfBirth && Boolean(formik.errors.dayOfBirth)}
                    helperText={formik.touched.dayOfBirth && formik.errors.dayOfBirth}
                  />
                </div>
                <div className="form-group">
                  <Select
                    fullWidth
                    id="category_id"
                    name="category_id"
                    value={formik.values.category_id}
                    onChange={formik.handleChange}
                    variant="filled"
                    label="Danh mục"
                    error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                  >
                    <MenuItem value="" disabled>
                      Chọn danh mục
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category_id && formik.errors.category_id && (
                    <div className="error-text">{formik.errors.category_id}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue("image", event.currentTarget.files[0]);
                      setSelectedFile(URL.createObjectURL(event.currentTarget.files[0]));
                    }}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                    >
                      Upload Image
                    </Button>
                  </label>
                  {selectedFile && (
                    <img
                      src={selectedFile}
                      alt="Selected"
                      style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                  )}
                  {formik.touched.image && formik.errors.image && (
                    <div className="error-text">{formik.errors.image}</div>
                  )}
                </div>
                {/* ... other form groups */}
                <div className="form-group">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Lưu
                  </Button>
                  <Link to="/manager/products">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => toast.warning('Hủy thêm sản phẩm')}
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

export default AddProduct;
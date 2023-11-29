import React, { useState, useEffect } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Select, MenuItem } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import Box from '@mui/material/Box';

const EditProductForm = ({ productId }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const validationSchema = yup.object().shape({
    category_id: yup.string().required('Danh mục là bắt buộc'),
    image: yup.mixed().optional('Hình ảnh là bắt buộc'),
    name: yup.string().required('Tên sản phẩm là bắt buộc'),
    price: yup
      .number()
      .typeError('Giá tiền phải là một số')
      .positive('Giá tiền phải là một số dương')
      .min(1, 'Giá tiền phải lớn hơn hoặc bằng 1')
      .required('Giá tiền là bắt buộc'),
    sex: yup.string().required('Giới tính là bắt buộc'),
    description: yup.string().required('Mô tả là bắt buộc'),
    discount: yup
      .number()
      .typeError('Giảm giá phải là một số')
      .min(0, 'Giảm giá phải là một số không âm')
      .optional(),
    day_of_birth: yup.string().required('Ngày sinh là bắt buộc'),
    statusProduct: yup.string().required('Trạng thái là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      image: null,
      name: '',
      price: 0,
      sex: 'true',
      description: '',
      discount: 0,
      day_of_birth: '',
      statusProduct: '1',
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append('category_id', values.category_id);

      // Kiểm tra xem người dùng có chọn ảnh mới hay không
      if (values.image) {
        formData.append('imageFiles', values.image);
      } else {
        // Nếu không, thêm đường dẫn ảnh từ API vào FormData
        formData.append('image', selectedFile);
      }

      // Thêm các trường khác vào FormData
      formData.append('price', values.price);
      formData.append('name', values.name);
      formData.append('sex', values.sex);
      formData.append('description', values.description);
      formData.append('bird_mother_id', values.bird_mother_id);
      formData.append('bird_father_id', values.bird_father_id);
      formData.append('Discount', values.discount);
      formData.append('TypeProduct', values.typeProduct);
      formData.append('statusProduct', values.statusProduct);
      formData.append('day_of_birth', values.day_of_birth);
      formData.append('userId', values.userId);

      try {
        const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/UpdateProduct/${productId}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          toast.success('Chỉnh sửa sản phẩm thành công!');
          navigate('/manager/products');
        } else {
          console.error('Lỗi khi cập nhật sản phẩm.');
          toast.error('Lỗi khi cập nhật sản phẩm.');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        toast.error('Lỗi khi cập nhật sản phẩm.');
      }
    },
  });

  useEffect(() => {
    fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        const productData = data.data;
        productData.price = parseFloat(productData.price);
        productData.discount = parseFloat(productData.discount);
        productData.sex = productData.sex ? 'true' : 'false';

        // Kiểm tra và đặt đường dẫn ảnh với URL đầy đủ
        if (productData.image) {
          productData.image = `http://birdsellingapi-001-site1.ctempurl.com/${productData.image}`;
        }
        console.log(productData);
        formik.setValues(productData);
        setSelectedFile(productData.image);
      })
      .catch((error) => console.error(error));
  }, [productId]);

  useEffect(() => {
    fetch('http://birdsellingapi-001-site1.ctempurl.com/api/BirdCategory/GetAll')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error('Invalid response for categories:', data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <form className="edit-products-container" onSubmit={formik.handleSubmit}>
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
        <MenuItem value="">Chọn danh mục</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.category_name}
          </MenuItem>
        ))}
      </Select>
      <div className="form-group">
        <TextField
          fullWidth
          id="name"
          label="Tên sản phẩm"
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
          label="Giá tiền"
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
            label="FeMale"
          />
        </RadioGroup>
        {formik.touched.sex && formik.errors.sex && (
          <div className="error-text">{formik.errors.sex}</div>
        )}
      </div>
      <div className="form-group">
        <TextField
          fullWidth
          id="discount"
          label="Giảm giá"
          variant="filled"
          type="number"
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
          id="day_of_birth"
          label="Ngày sinh"
          variant="filled"
          type="datetime-local"
          value={formik.values.day_of_birth}
          onChange={formik.handleChange}
          name="day_of_birth"
          error={formik.touched.day_of_birth && Boolean(formik.errors.day_of_birth)}
          helperText={formik.touched.day_of_birth && formik.errors.day_of_birth}
        />
      </div>
      <div className="form-group">
        <TextField
          fullWidth
          id="description"
          label="Mô tả"
          variant="filled"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>
      <div className="form-group">
        <Select
          fullWidth
          id="statusProduct"
          name="statusProduct"
          value={formik.values.statusProduct}
          onChange={formik.handleChange}
          variant="filled"
          label="Trạng thái"
          error={formik.touched.statusProduct && Boolean(formik.errors.statusProduct)}
        >
          <MenuItem value="" disabled>
            Chọn trạng thái
          </MenuItem>
          <MenuItem value="1">Còn hàng</MenuItem>
          <MenuItem value="2">Đã bán</MenuItem>
          <MenuItem value="3">Lỗi</MenuItem>
          <MenuItem value="4">Không bán</MenuItem>
        </Select>
        {formik.touched.statusProduct && formik.errors.statusProduct && (
          <div className="error-text">{formik.errors.statusProduct}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(event) => {
            event.preventDefault(); // Add this line
            formik.setFieldValue("image", event.currentTarget.files[0]);
            const file = event.currentTarget.files[0];
            setSelectedFile(file ? URL.createObjectURL(file) : formik.values.image);
          }}
        />
        {selectedFile && (
          <img
            src={selectedFile}
            alt="Selected"
            style={{ width: '200px', height: '200px', marginTop: '10px' }}
          />
        )}
      </div>
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
          onClick={() => toast.warning('Hủy chỉnh sửa sản phẩm')}
        >
          Hủy
        </Button>
      </Link>
    </form>
  );
};

const EditProduct = () => {
  const { id } = useParams();

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarManager />
      <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
        <AppBarManager />
        <div className="main-edit-product">
          <EditProductForm productId={id} />
        </div>
      </Box>
    </Box>
  );
};

export default EditProduct;

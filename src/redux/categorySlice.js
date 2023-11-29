// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

// const categorySlice = createSlice({
//     name: 'categories',
//     initialState: {
//         categories: [],
//         categoryProducts: [],
//         isLoading: false,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchCategories.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchCategories.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.categories = action.payload;
//         });
//         builder.addCase(fetchCategories.rejected, (state, action) => {
//             state.isLoading = false;
//         });
//         builder.addCase(fetchProductsOfCategory.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchProductsOfCategory.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.categoryProducts = action.payload;
//         });
//         builder.addCase(fetchProductsOfCategory.rejected, (state, action) => {
//             state.isLoading = false;
//         });
//     },
// });

// export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}BirdCategory/GetAll`);
//         const data = await response.data.data;
//         // console.log(data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });

// export const fetchProductsOfCategory = createAsyncThunk('category-products/fetch', async (categoryId) => {
//     try {
//         const response = await axios.get(`${BASE_URL}Product/GetProduct?category_id=${categoryId}`);
//         const data = await response.data.data;
//         // console.log(data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });

// export const getAllCategories = (state) => state.categories.categories;
// export const getAllProductsByCategory = (state) => state.categories.categoryProducts;
// export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
    try {
        const response = await axios.get(`${BASE_URL}BirdCategory/GetAll`);
        const data = await response.data.data;
        return data;
    } catch (error) {
        return error;
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        allCategories: [],
        selectedCategory: null,
        isLoading: false,
    },
    reducers: {
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allCategories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { selectCategory } = categorySlice.actions;
export const getAllCategories = (state) => state.categories.allCategories;
export const getSelectedCategory = (state) => state.categories.selectedCategory;
export const getIsCategoryLoading = (state) => state.categories.isLoading;

export default categorySlice.reducer;

// const categorySlice = createSlice({
//     name: 'categories',
//     initialState: {
//         data: [],
//         isLoading: false,
//     },
//     reducers: {
//         setCategories(state, action) {
//             state.data = action.payload;
//         },
//         setLoading(state, action) {
//             state.isLoading = action.payload;
//         },
//     },
// });

// export const { setCategories, setLoading } = categorySlice.actions;
// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { dispatch }) => {
//     try {
//         // dispatch(setCategories(data)); // Đánh dấu là đang loading
//         const response = await axios.get(`${BASE_URL}BirdCategory/GetAll`);
//         const data = await response.data.data;
//         // dispatch(setCategories(data)); // Cập nhật dữ liệu
//         // dispatch(setLoading(false)); // Kết thúc loading
//     } catch (error) {
//         // dispatch(setLoading(false)); // Kết thúc loading nếu có lỗi
//         return error;
//     }
// });

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'https://birdsellingapi.azurewebsites.net/api/';

// const categorySlice = createSlice({
//     name: 'categories',
//     initialState: {
//         data: [],
//     },
//     reducers: {
//         setCategories: (state, action) => {
//             return action.payload;
//         },
//     },
// });

// export const { setCategories } = categorySlice.actions;
// export default categorySlice.reducer;

// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//     const response = await axios.get(BASE_URL + 'BirdCategory/GetAll');
//     const data = response.data.data;
//     // console.log(data);
//     return data;
// });

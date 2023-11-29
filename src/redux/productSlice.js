// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

// const productSlice = createSlice({
//     name: 'products',
//     initialState: {
//         allProducts: [],
//         productSingle: [],

//         isLoading: false,
//     },
//     reducers: {},

//     extraReducers: (builder) => {
//         builder.addCase(fetchProducts.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchProducts.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.allProducts = action.payload;
//         });
//         builder.addCase(fetchProducts.rejected, (state, action) => {
//             state.isLoading = false;
//         });
//         builder.addCase(fetchProductSingle.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchProductSingle.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.productSingle = action.payload;
//         });
//         builder.addCase(fetchProductSingle.rejected, (state, action) => {
//             state.isLoading = false;
//         });
//     },
// });

// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}Product/GetProduct`);
//         const data = await response.data.data;
//         // console.log(data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });

// export const fetchProductSingle = createAsyncThunk('product-single/fetch', async (productId) => {
//     try {
//         const response = await axios.get(`${BASE_URL}Product/GetProductByID/${productId}`);
//         const data = await response.data.data;
//         // console.log(data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });

// export const getAllProducts = (state) => state.products.allProducts;
// export const getProductSingle = (state) => state.products.productSingle;
// export const getIsLoading = (state) => state.products.isLoading;

// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: [],
        productSingle: {
            id: '',
            name: '',
            price: 0,
            description: '',
            image: '',
        },

        isLoading: false,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allProducts = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(fetchProductSingle.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductSingle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productSingle = action.payload;
        });
        builder.addCase(fetchProductSingle.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

export const fetchProducts = createAsyncThunk('products/fetch', async (filterConditions) => {
    try {
        const response = await axios.get('http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProduct', {
            params: filterConditions,
        });
        return response.data.data;
    } catch (error) {
        return error;
    }
});

export const fetchProductSingle = createAsyncThunk('product-single/fetch', async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}Product/GetProductByID/${productId}`);
        const data = await response.data.data;
        // console.log(data);
        return data;
    } catch (error) {
        return error;
    }
});

export const getAllProducts = (state) => state.products.allProducts;
export const getProductSingle = (state) => state.products.productSingle;
export const getIsLoading = (state) => state.products.isLoading;

export default productSlice.reducer;

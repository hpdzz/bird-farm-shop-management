// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

// export const fetchAddToCart = createAsyncThunk('cart/fetchAddToCart', async (payload) => {
//     try {
//         const response = await axios.post(`${BASE_URL}Cart/Add-Product-To-Cart`, payload, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = response.data.data;
//         console.log('data', data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });

// export const fetchAllCart = createAsyncThunk('cart/fetchAllCart', async (userID) => {
//     try {
//         const response = await axios.get(`${BASE_URL}Cart/Get-All-Cart?userID=${userID}`);
//         const data = response.data.data;
//         console.log('User cart data:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching all cart:', error);
//         throw error;
//     }
// });

// export const fetchDeleteCarts = createAsyncThunk('cart/fetchDeleteCarts', async (cartIDs) => {
//     console.log('cartIDs fetch', cartIDs);
//     try {
//         const response = await axios.delete(`${BASE_URL}Cart/Delete-Carts`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: cartIDs, // Truyền mảng "id" vào dưới dạng body
//         });
//         const data = response.data.data;
//         console.log('delete', data);
//         return data;
//     } catch (error) {
//         console.error('Error deleting carts:', error);
//         throw error;
//     }
// });

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: JSON.parse(localStorage.getItem('cart')) || [],
//         allCartData: [],
//         itemsCount: 0,
//         cartID: JSON.parse(localStorage.getItem('cartID')) || [],
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const isProductInCart = state.items.some((product) => product.id === action.payload.id);
//             if (!isProductInCart) {
//                 state.items.push(action.payload);
//             }
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         },
//         removeFromCart: (state, action) => {
//             state.items = state.items.filter((product) => product.id !== action.payload);
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         },
//         clearCart: (state, action) => {
//             state.items = [];
//         },
//         getCartTotal: (state, action) => {
//             state.itemsCount = state.items.length;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
//             const newCartID = action.payload;
//             state.cartID.push(newCartID);
//             localStorage.setItem('cartID', JSON.stringify(state.cartID));
//         });

//         builder.addCase(fetchAllCart.fulfilled, (state, action) => {
//             // localStorage.setItem('cart', JSON.stringify(state.items));
//             state.allCartData = action.payload;
//             localStorage.setItem('cart', JSON.stringify(state.allCartData));
//         });

//         builder.addCase(fetchDeleteCarts.fulfilled, (state, action) => {
//             console.log('Delete carts response:', action.payload); // Log response từ server
//             if (action.payload && action.payload.data !== null) {
//                 // Lọc bỏ sản phẩm khỏi state.items
//                 state.items = state.items.filter(
//                     (product) => !action.payload.some((cart) => cart.product_id === product.id),
//                 );

//                 // Lọc bỏ cartID khỏi state.cartID
//                 const updatedCartIDs = state.cartID.filter((id) => !action.payload.some((cart) => cart.id === id));
//                 state.cartID = updatedCartIDs;

//                 // Cập nhật localStorage
//                 localStorage.setItem('cartID', JSON.stringify(updatedCartIDs));
//                 localStorage.setItem('cart', JSON.stringify(state.items));
//             }
//         });
//     },
// });

// export const { addToCart, removeFromCart, clearCart, getCartTotal } = cartSlice.actions;

// export default cartSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: JSON.parse(localStorage.getItem('cart')) || [],
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const isProductInCart = state.items.some((product) => product.id === action.payload.id);
//             if (!isProductInCart) {
//                 state.items.push(action.payload);
//             }
//         },
//         clearCart: (state) => {
//             state.items = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
//             // Cập nhật giỏ hàng trong localStorage sau khi API đã thành công
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         });
//     },
// });

// export const fetchAddToCart = createAsyncThunk('cart/fetchAddToCart', async (payload) => {
//     try {
//         const response = await axios.post(`${BASE_URL}Cart/Add-Product-To-Cart`, payload, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = response.data.data;
//         console.log(data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });
// export const { addToCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

// export const fetchAddToCart = createAsyncThunk('cart/fetchAddToCart', async (payload) => {
//     try {
//         const response = await axios.post(`${BASE_URL}Cart/Add-Product-To-Cart`, payload, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = response.data.data;
//         console.log(data);
//         return data;
//     } catch (error) {
//         return error;
//     }
// });

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: JSON.parse(localStorage.getItem('cart')) || [],
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const isProductInCart = state.items.some((product) => product.id === action.payload.id);
//             if (!isProductInCart) {
//                 state.items.push(action.payload);
//             }
//         },
//         clearCart: (state) => {
//             state.items = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
//             localStorage.setItem('cart', JSON.stringify(state.items));
//         });
//     },
// });

// export const { addToCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

export const fetchAddToCart = createAsyncThunk('cart/fetchAddToCart', async ({ product_id, user_id }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}Cart/Add-Product-To-Cart `,
            {
                product_id,
                user_id,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        const data = response.data.data;
        console.log('Add to cart response:', data);
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
});
export const fetchAllCart = createAsyncThunk('cart/fetchAllCart', async (user_id) => {
    try {
        const response = await axios.get(`${BASE_URL}Cart/Get-All-Cart?userID=${user_id}`);
        const data = response.data.data;
        // console.log('User cart data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching all cart:', error);
        throw error;
    }
});

export const fetchDeleteCarts = createAsyncThunk('cart/fetchDeleteCarts', async (cartID) => {
    try {
        const response = await axios.delete(`${BASE_URL}Cart/Delete-Carts`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: cartID,
        });
        const data = response.data.data;
        console.log('delete', data);
        return data;
    } catch (error) {
        console.error('Error deleting carts:', error);
        throw error;
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: [],
        itemsCount: 0,
    },
    reducers: {
        resetCart: (state) => {
            state.cartData = [];
            state.itemsCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
            state.cartData.push(action.payload);
            state.itemsCount = state.cartData.length;
        });
        builder.addCase(fetchAllCart.fulfilled, (state, action) => {
            state.cartData = action.payload;
            state.itemsCount = state.cartData.length;
        });
        builder.addCase(fetchDeleteCarts.fulfilled, (state, action) => {
            const deletedCartItemID = action.payload;
            if (deletedCartItemID) {
                state.cartData = state.cartData.filter((item) => item.product_id !== deletedCartItemID.product_id);
                state.itemsCount = state.cartData.length;
            }
        });
    },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;

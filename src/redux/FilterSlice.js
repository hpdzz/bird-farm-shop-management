// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        category: 'all',
        name: '',
        sex: '',
        typeProduct: '',
        priceFrom: '',
        priceTo: '',
        statusProduct: '',
        // Thêm các trường tương ứng với các điều kiện lọc khác
    },
    reducers: {
        updateFilters: (state, action) => {
            // Hàm reducer này cập nhật trạng thái của slice với các giá trị từ payload
            // console.log(action.payload); // Kiểm tra xem action.payload có chứa giá trị lọc không
            return { ...state, ...action.payload };
        },
        resetFilters: (state) => {
            // Hàm reducer này đặt lại tất cả các giá trị lọc về giá trị mặc định
            return {
                ...state,
                category: 'all',
                name: '',
                sex: '',
                typeProduct: '',
                priceFrom: '',
                priceTo: '',
                statusProduct: '',
                // Reset các trường tương ứng với các điều kiện lọc khác
            };
        },
        updateCategoryFilter: (state, action) => {
            state.category = action.payload;
        },
    },
});

export const { updateFilters, resetFilters, updateCategoryFilter } = filterSlice.actions;
export const selectFilters = (state) => state.filter;
export default filterSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (value) => {
    try {
        const response = await axios.get(`${BASE_URL}Product/GetProduct?name=${value}`);
        return response.data.data;
    } catch (error) {
        return error;
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearSearch: (state, action) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResults.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.searchResults = action.payload;
        });
        builder.addCase(fetchSearchResults.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const getInput = (state) => state.search.input;
export const getSearchResults = (state) => state.search.searchResults;

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
//unicode

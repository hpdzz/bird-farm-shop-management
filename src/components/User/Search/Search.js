// import React, { useEffect, useState } from 'react';
// import './Search.scss';
// import { useDispatch, useSelector } from 'react-redux';

// import { setInput, fetchSearchResults, getInput, getSearchResults } from '../../../redux/searchSlice';
// import { getAllProducts, getIsLoading } from '../../../redux/productSlice';
// import { BeatLoader } from 'react-spinners';
// import ProductList from '../ProductList/ProductList';

// const Search = () => {
//     const dispatch = useDispatch();
//     const [searchInput, setSearchInput] = useState('');
//     const isLoading = useSelector(getIsLoading); // Thêm dòng này để lấy isLoading từ Redux
//     const products = useSelector(getAllProducts);
//     const input = useSelector(getInput);
//     const searchResults = useSelector(getSearchResults);

//     useEffect(() => {
//         dispatch(setInput(searchInput));
//     }, [dispatch, searchInput]);

//     const handleSearch = () => {
//         dispatch(fetchSearchResults(input));
//     };
//     return (
//         <div className="search-container">
//             <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//             {isLoading ? (
//                 <div style={{ textAlign: 'center' }}>
//                     <BeatLoader color="#36d7b7" />
//                 </div>
//             ) : (
//                 <ProductList products={searchResults.length > 0 ? searchResults : products} />
//             )}
//         </div>
//     );
// };

// export default Search;

import React, { useState } from 'react';
import './Search.scss';
import { useDispatch } from 'react-redux';
import { fetchSearchResults, clearSearch } from '../../../redux/searchSlice';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, InputAdornment, InputBase, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== '') {
            dispatch(fetchSearchResults(searchInput));
        } else {
            dispatch(clearSearch());
        }
        // navigate('/products'); // Nếu bạn muốn điều hướng sau khi tìm kiếm, hãy sử dụng navigate ở đây
    };

    return (
        <Paper
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: 400,
            }}
            onSubmit={handleSearch}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;

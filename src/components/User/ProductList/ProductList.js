import React, { useEffect, useState } from 'react';
import { fetchProducts, getAllProducts } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSearchResults } from '../../../redux/searchSlice';
import ProductListDisplay from './ProductListDisplay';

const ProductList = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector(getSearchResults);
    const allProducts = useSelector(getAllProducts);
    // console.log(allProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleProductsPerPage = (e) => {
        const newProductsPerPage = parseInt(e.target.value, 10);
        setProductsPerPage(newProductsPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (searchResults.length > 0) {
            const maxPage = Math.ceil(searchResults.length / productsPerPage);
            if (currentPage > maxPage) {
                setCurrentPage(Math.max(1, maxPage));
            }
        }
    }, [searchResults, currentPage, productsPerPage, setCurrentPage]);

    return (
        <ProductListDisplay
            products={searchResults.length > 0 ? searchResults : allProducts}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            totalProducts={searchResults.length > 0 ? searchResults.length : allProducts.length}
            paginate={paginate}
            handleProductsPerPage={handleProductsPerPage}
        />
    );
};
export default ProductList;

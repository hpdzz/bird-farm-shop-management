import React, { useEffect } from 'react';
import './Home.scss';
import Banner from '../../components/User/Banner/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, getAllCategories } from '../../redux/categorySlice';
import Category from '../../components/User/Category/Category';

import { fetchProducts, getAllProducts } from '../../redux/productSlice';

import Search from '../../components/User/Search/Search';
import ProductList from '../../components/User/ProductList/ProductList';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch]);

    const categories = useSelector(getAllCategories);
    // const products = useSelector(getAllProducts);
    return (
        <div>
            <Banner />
            {/* {<Category categories={categories} />} */}

            <div className="layout">
                <div className="products-container">
                    <div className="sec-heading">Our Products</div>
                    <Search />
                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export default Home;

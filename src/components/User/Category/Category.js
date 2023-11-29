import React from 'react';
import './Category.scss';
import { Link } from 'react-router-dom';
const Category = ({ categories }) => {
    return (
        <div className="wrap-category">
            <div className="category-content">
                <div className="category-title">
                    <h1>CATEGORIES</h1>
                </div>
                <div className="category-list">
                    {categories.slice(0, 5).map((category) => {
                        return (
                            <h3 className="category-item" key={category.id}>
                                <Link to={`/products/category/${category.id}`}>{category.category_name}</Link>
                            </h3>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Category;

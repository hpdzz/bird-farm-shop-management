import React, { useState } from 'react';
import './Pagination.scss';

function Pagination({ productsPerPage, totalProducts, currentPage, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={number === currentPage ? 'btn-pagina bnt-active' : 'btn-pagina'}
                >
                    {number}
                </button>
            ))}
        </div>
    );
}

export default Pagination;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import './WhatsNewMain.css';
import {useLocation, useNavigate} from "react-router-dom";

const TextSuggestions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const dispatch = useDispatch();
    const products = location.state?.products || []
    const returnToWhatsNew = () => {
        navigate("/");
    };

    return (
        <div>
            {/*<div className="whatsNewContainer">*/}

            {products.length === 0 &&
                <h1>
                    No product matches found.
                </h1>
            }
            <div className="productsGrid">
                {products.map((product, index) => (
                    <ProductCard key={`${product.productId}-${index}`} product={product} />
                ))}
            </div>
            <div className="loadMoreContainer">
                <button onClick={returnToWhatsNew}>Return to What's New Page</button>
            </div>
            {/*</div>*/}
        </div>
    );
};

export default TextSuggestions;
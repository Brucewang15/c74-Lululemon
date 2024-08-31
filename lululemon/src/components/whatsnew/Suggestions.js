import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import './WhatsNewMain.css';
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.helpReducer.suggestedProducts);
    const returnToWhatsNew = () => {
        navigate("/");
    };

    return (
        <div>
            {/*<div className="whatsNewContainer">*/}
            
                {products.length == 0 && 
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

export default Suggestions;
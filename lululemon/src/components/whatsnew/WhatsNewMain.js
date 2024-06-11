import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from './ProductCard';
import './WhatsNewMain.css';

const WhatsNewMain = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.productReducer);
    console.log("PRODUCTS ======", products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="whatsNewContainer">
                <div className="productsGrid">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatsNewMain;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
//import Header from '../components/Header';
//import './WhatsNew.css';

const WhatsNew = () => {
    const dispatch = useDispatch();
    const { loading, products, filters, error } = useSelector((state) => state.productReducer);

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
            <div className="whats-new-container">
                <h1>What's New</h1>
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.productId} className="product-card">
                            <img src={product.images[0].mainCarousel.media.split('|')[0].trim()} alt={product.images[0].colorAlt} />
                            <h2>{product.productName}</h2>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatsNew;
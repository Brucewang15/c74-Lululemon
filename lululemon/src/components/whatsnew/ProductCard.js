import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    console.log(product);
    const mainImage = product.images[0].mainCarousel.media.split('|')[0].trim();
    const swatches = product.swatches;

    return (
        <div className="product-card">
            <img src={mainImage} alt={product.productName} className="product-image" />
            <div className="swatches">
                {swatches.map((swatch, index) => (
                    <img key={index} src={swatch.swatch} alt={swatch.swatchAlt} className="swatch" />
                ))}
            </div>
            <h2 className="product-name">{product.productName}</h2>
            <p className="product-price">{product.price}</p>
        </div>
    );
};

export default ProductCard;
import React, {useState} from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    //console.log(product);
    // Initialize state and set default values
    const [currentImage, setCurrentImage] = useState(null);
    const [hasData, setHasData] = useState(false);

    let images = [];
    let swatches = [];

    if (product && product.images && product.swatches) {
        images = product.images[0].mainCarousel.media.split('|').map(img => img.trim());
        swatches = product.swatches;
        if (!hasData) {
            setCurrentImage(images[0]);
            setHasData(true);
        }
    }

    if (!product || !product.images || !product.swatches) {
        return (
            <>Something went wrong, please check api</>
        )
    }

    return (
        <div
            className="productCard"
            onMouseEnter={() => setCurrentImage(images[1] || images[0])}
            onMouseLeave={() => setCurrentImage(images[0])}
        >
            <img src={currentImage} alt={product.productName} className="productImage"/>
            <div className="swatches">
                {swatches.map((swatch, index) => (
                    <img key={index} src={swatch.swatch} alt={swatch.swatchAlt} className="swatch"/>
                ))}
            </div>
            <h2 className="productName">{product.name}</h2>
            <p className="productPrice">{product.price}</p>
        </div>
    );
};

export default ProductCard;
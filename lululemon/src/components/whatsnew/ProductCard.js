import React, {useRef, useState} from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [visibleSwatches, setVisibleSwatches] = useState([]);
    const [swatchIndex, setSwatchIndex] = useState(0);

    if (!product || !product.images || !product.swatches) {
        return <div>Something went wrong, please check the API.</div>;
    }

    const images = product.images[0].mainCarousel.media.split('|').map(img => img.trim());
    const swatches = product.swatches;

    // Initialize currentImage and visibleSwatches
    if (!currentImage) {
        setCurrentImage(images[0]);
        setVisibleSwatches(swatches.slice(0, 7));
    }

    const scrollSwatches = (direction) => {
        const newIndex = swatchIndex + direction;
        if (newIndex >= 0 && newIndex <= swatches.length - 7) {
            setSwatchIndex(newIndex);
            setVisibleSwatches(swatches.slice(newIndex, newIndex + 7));
        }
    };

    return (
        <div className="productCard">
            <img
                src={currentImage}
                alt={product.name}
                className="productImage"
                onMouseEnter={() => setCurrentImage(images[1] || images[0])}
                onMouseLeave={() => setCurrentImage(images[0])}
            />
            <div className="swatchesContainer">
                {swatches.length > 7 && (
                    <button className="swatchScrollButton left" onClick={() => scrollSwatches(-1)}>{"<"}</button>
                )}
                <div className="swatches">
                    {visibleSwatches.map((swatch, index) => (
                        <button key={index} className="swatchButton" onClick={() => setCurrentImage(images[index])}>
                            <img src={swatch.swatch} alt={swatch.swatchAlt} className="swatch" />
                        </button>
                    ))}
                </div>
                {swatches.length > 7 && (
                    <button className="swatchScrollButton right" onClick={() => scrollSwatches(1)}>{">"}</button>
                )}
            </div>
            <h2 className="productName">{product.name}</h2>
            <p className="productPrice">{product.price}</p>
        </div>
    );
};

export default ProductCard;
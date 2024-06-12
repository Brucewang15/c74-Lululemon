import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [visibleSwatches, setVisibleSwatches] = useState([]);
    const [swatchIndex, setSwatchIndex] = useState(0);
    const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(null);

    // Initialize state
    if (!currentImage && product && product.images && product.swatches) {
        const initialImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[0];
        const initialSecondImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[1];
        setCurrentImage(initialImage);
        setOriginalImage(initialImage);
        setSecondImage(initialSecondImage);
        setVisibleSwatches(product.swatches.slice(0, 7));
    }

    if (!product || !product.images || !product.swatches) {
        return <div>Something went wrong, please check the API.</div>;
    }

    const scrollSwatches = (direction) => {
        const newIndex = swatchIndex + direction;
        if (newIndex >= 0 && newIndex <= product.swatches.length - 7) {
            setSwatchIndex(newIndex);
            setVisibleSwatches(product.swatches.slice(newIndex, newIndex + 7));
        }
    };

    const handleSwatchHover = (colorId, index) => {
        const matchingImage = product.images.find(image => image.colorId === colorId);
        if (matchingImage) {
            const firstImageInMedia = matchingImage.mainCarousel.media.split('|').map(img => img.trim())[0];
            const secondImageInMedia = matchingImage.mainCarousel.media.split('|').map(img => img.trim())[1];
            setCurrentImage(firstImageInMedia);
            setOriginalImage(firstImageInMedia);
            setSecondImage(secondImageInMedia);
        }
    };

    const handleSwatchClick = (colorId, index) => {
        const matchingImage = product.images.find(image => image.colorId === colorId);
        if (matchingImage) {
            const firstImageInMedia = matchingImage.mainCarousel.media.split('|').map(img => img.trim())[0];
            const secondImageInMedia = matchingImage.mainCarousel.media.split('|').map(img => img.trim())[1];
            setOriginalImage(firstImageInMedia);
            setCurrentImage(firstImageInMedia);
            setSecondImage(secondImageInMedia);
            setSelectedSwatchIndex(index);
        }
    };

    const handleMouseEnterImage = () => {
        setCurrentImage(secondImage || originalImage);
    };

    const handleMouseLeaveImage = () => {
        setCurrentImage(originalImage);
    };

    return (
        <div className="productCard">
            <img
                src={currentImage}
                alt={product.name}
                className="productImage"
                onMouseEnter={handleMouseEnterImage}
                onMouseLeave={handleMouseLeaveImage}
            />
            <div className="swatchesContainer">
                {product.swatches.length > 7 && (
                    <button className="swatchScrollButton left" onClick={() => scrollSwatches(-1)}>{"<"}</button>
                )}
                <div className="swatches">
                    {visibleSwatches.map((swatch, index) => (
                        <button
                            key={index}
                            className={`swatchButton ${selectedSwatchIndex === index ? 'selected' : ''}`}
                            onMouseEnter={() => handleSwatchHover(swatch.colorId, index)}
                            onClick={() => handleSwatchClick(swatch.colorId, index)}
                        >
                            <img src={swatch.swatch} alt={swatch.swatchAlt} className="swatch" />
                        </button>
                    ))}
                </div>
                {product.swatches.length > 7 && (
                    <button className="swatchScrollButton right" onClick={() => scrollSwatches(1)}>{">"}</button>
                )}
            </div>
            <h2 className="productName">{product.name}</h2>
            <p className="productPrice">{product.price}</p>
        </div>
    );
};

export default ProductCard;
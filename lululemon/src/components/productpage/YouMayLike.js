import React, {useEffect, useState} from 'react';
import './YouMayLike.css';
import {useNavigate} from "react-router-dom";

const YouMayLike = ({ products }) => {
    const [currentImages, setCurrentImages] = useState({});
    const [hoverIndex, setHoverIndex] = useState(null);
    const navigate = useNavigate();
    //console.log(products[0]);
    useEffect(() => {
        const initialImages = {};
        products.forEach((product, index) => {
            const initialImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[0];
            const secondImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[1];
            initialImages[index] = {
                current: initialImage,
                original: initialImage,
                second: secondImage
            };
        });
        setCurrentImages(initialImages);
    }, [products]);

    const handleMouseEnterImage = (index) => {
        setCurrentImages(prevImages => ({
            ...prevImages,
            [index]: {
                ...prevImages[index],
                current: prevImages[index].second || prevImages[index].original,
            }
        }));
        setHoverIndex(index);
    };

    const handleMouseLeaveImage = (index) => {
        setCurrentImages(prevImages => ({
            ...prevImages,
            [index]: {
                ...prevImages[index],
                current: prevImages[index].original,
            }
        }));
        setHoverIndex(null);
    };

    const handleSwatchHover = (productIndex, colorId) => {
        const product = products[productIndex];
        const matchingImage = product.images.find(image => image.colorId === colorId);
        if (matchingImage) {
            const firstImageInMedia = matchingImage.mainCarousel.media.split('|').map(img => img.trim())[0];
            setCurrentImages(prevImages => ({
                ...prevImages,
                [productIndex]: {
                    ...prevImages[productIndex],
                    current: firstImageInMedia
                }
            }));
        }
    };

    const handleSwatchClick = (productIndex, colorId) => {
        navigate(`/product/${products[productIndex].productId}?colorId=${colorId}`);
    };

    const handleSwatchContainer = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="youMayLikeBottom">
            <h3>You may also like</h3>
            <div className="products">
                {products.map((product, productIndex) => (
                    <div key={productIndex} className="product">
                        <div
                            className="imageContainer"
                            onMouseEnter={() => handleMouseEnterImage(productIndex)}
                            onMouseLeave={() => handleMouseLeaveImage(productIndex)}
                        >
                            <img
                                src={currentImages[productIndex]?.current}
                                alt={product.name}
                                className="productImage"
                            />
                        </div>
                        {hoverIndex === productIndex && (
                            <div className="swatchesContainer" onMouseLeave={handleMouseLeaveImage}>
                                <div className="swatches">
                                    {product.swatches.slice(0, 7).map((swatch, swatchIndex) => (
                                        <button
                                            key={swatchIndex}
                                            className="swatchButton"
                                            onMouseEnter={() => handleSwatchHover(productIndex, swatch.colorId)}
                                            onClick={() => handleSwatchClick(productIndex, swatch.colorId)}
                                        >
                                            <img src={swatch.swatch} alt={swatch.swatchAlt} className="swatch"/>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouMayLike;

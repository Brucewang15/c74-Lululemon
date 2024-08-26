import React, {useEffect, useState} from 'react';
import './ProductCard.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist} from "../../redux/actions/wishlistAction";

const ProductCard = ({product}) => {
    const userInfo = useSelector((state) => state.authReducer.user);
    const isLogin = useSelector((state) => state.authReducer.loginStatus);
    const [currentImage, setCurrentImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [visibleSwatches, setVisibleSwatches] = useState([]);
    const [swatchIndex, setSwatchIndex] = useState(0);
    const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch();


    // Initialize state
    // if (!currentImage && product && product.images && product.swatches) {
    //     const initialImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[0];
    //     const initialSecondImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[1];
    //     setCurrentImage(initialImage);
    //     setOriginalImage(initialImage);
    //     setSecondImage(initialSecondImage);
    //     setVisibleSwatches(product.swatches.slice(0, 7));
    // }

    useEffect(() => {
        if (product && product.images && product.swatches) {
            const initialImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[0];
            const initialSecondImage = product.images[0].mainCarousel.media.split('|').map(img => img.trim())[1];
            setCurrentImage(initialImage);
            setOriginalImage(initialImage);
            setSecondImage(initialSecondImage);
            setVisibleSwatches(product.swatches.slice(0, 7));
            setSelectedColorId(product.swatches[0].colorId);
        }
    }, [product]);

    if (!product || !product.images || !product.swatches) {
        return <div>Something went wrong, please check the API.</div>;
    }

    const scrollSwatches = (direction) => {
        const newIndex = swatchIndex + direction * 7;
        if (newIndex >= 0 && newIndex < product.swatches.length) {
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
            setSelectedColorId(colorId)
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
            setSelectedColorId(colorId)
            navigate(`/product/${product.productId}?colorId=${colorId}`)
        }
    };

    const handleMouseEnterImage = () => {
        setCurrentImage(secondImage || originalImage);
    };

    const handleMouseLeaveImage = () => {
        setCurrentImage(originalImage);
    };

    const handleNavigate = () => {
        // navigate(`/product/${product.productId}/colorId:${product.swatches[0].colorId}`)
        navigate(`/product/${product.productId}?colorId=${selectedColorId}`)
    }

    const handleLike = () => {
        //console.log("like button clicked with: ", product.productId);
        if (!isLogin) {
            alert("Ready to Wish List it? Sign in to your member account.")
        } else {
            dispatch(addToWishlist({
                productId: product.productId,
                name: product.name,
                price: product.price,
                image: currentImage
            }));
            alert("Product added to your wishlist!");
        }
    }
    return (
        <div className="productCard">
            <img
                onClick={handleNavigate}
                src={currentImage}
                alt={product.name}
                className="productImage"
                onMouseEnter={handleMouseEnterImage}
                onMouseLeave={handleMouseLeaveImage}
            />
            <button className="heartButton" onClick={handleLike}>
                <div className="heart">&#x2665;</div>
            </button>
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
                            onClick={() => {
                                handleSwatchClick(swatch.colorId, index)

                            }}
                        >
                            <img src={swatch.swatch} alt={swatch.swatchAlt} className="swatch"/>
                        </button>
                    ))}
                </div>
                {product.swatches.length > 7 && (
                    <button className="swatchScrollButton right" onClick={() => scrollSwatches(1)}>{">"}</button>
                )}
            </div>
            <h2 className="productName">{product.name}</h2>
            <p className="productPrice">{product.price}</p>
            <div className="compareContainer">
                <input type="checkbox" id="compare" name="compare" value="compare"/>
                <label htmlFor="compare">Compare</label>
            </div>
        </div>
    );
};

export default ProductCard;
import React, {useEffect, useState} from 'react';
import './ProductCard.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist, fetchWishlist, removeFromWishlist} from "../../redux/actions/wishlistAction";
import {Like} from "../icon/like"

const ProductCard = ({product}) => {
    const userInfo = useSelector((state) => state.authReducer.user);
    const isLogin = useSelector((state) => state.authReducer.loginStatus);
    const wishlistProducts = useSelector((state) => state.wishlistReducer.wishlist.products);
    //console.log(wishlistProducts);
    const [currentImage, setCurrentImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [visibleSwatches, setVisibleSwatches] = useState([]);
    const [swatchIndex, setSwatchIndex] = useState(0);
    const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null)
    const [isInWishlist, setIsInWishlist] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (isLogin && product && userInfo && userInfo.wishlist) {
    //         const isProductInWishlist = userInfo.wishlist.some(item => item.productId === product.productId);
    //         setIsInWishlist(isProductInWishlist);
    //     } else {
    //         setIsInWishlist(false); // Reset wishlist state when logged out or no user info
    //     }
    // }, [isLogin, product, userInfo]);
    // useEffect(() => {
    //     // Check if the current product is in the wishlist
    //     if (wishlist && product) {
    //         const found = wishlist.some(item => item.productId === product.productId);
    //         setIsInWishlist(found);
    //     }
    // }, [wishlist, product]);
    useEffect(() => {
        if (isLogin) {
            dispatch(fetchWishlist(userInfo.id));
            //console.log(userInfo);
        }
    }, [dispatch, isLogin])

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
        if (wishlistProducts) {
            setIsInWishlist(wishlistProducts.some(wishProduct => wishProduct.productId === product.productId));
        }
    }, [product, wishlistProducts]);

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
        //console.log("User info wishlist: ", userInfo.wishlist);
        if (!isLogin) {
            alert("Ready to Wish List it? Sign in to your member account.")
        } else {
            if (isInWishlist) {
                dispatch(removeFromWishlist(product.productId));
                setIsInWishlist(false);
                alert("Product removed from your wishlist!")
            } else {
                dispatch(addToWishlist({
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    image: currentImage
                }));
                setIsInWishlist(true);
                alert("Product added to your wishlist!");
            }

            //console.log(wishlistProducts);
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
            <button className={`heartButton ${isInWishlist ? 'redHeart' : ''}`} onClick={handleLike}>
                <div className="heart">&#x2665;</div>
            </button>
            {/*<div className="heart-icon">*/}
            {/*    <Like width={24} height={24}/>*/}
            {/*</div>*/}
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
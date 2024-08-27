import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist, fetchWishlist, removeFromWishlist} from "../../redux/actions/wishlistAction";

export const ImageCarousel = ({images, handleModalOpen, alt, product}) => {
    const userInfo = useSelector((state) => state.authReducer.user);
    const isLogin = useSelector((state) => state.authReducer.loginStatus);
    const wishlistProducts = useSelector((state) => state.wishlistReducer.wishlist.products);
    const [heartActive, setHeartActive] = useState(false);
    //const [isInWishlist, setIsInWishlist] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogin) {
            dispatch(fetchWishlist(userInfo.id));
            //console.log(userInfo);
        }
        if (wishlistProducts) {
            setHeartActive(wishlistProducts.some(wishProduct => wishProduct.productId === product.productId));
        }
    }, [dispatch, isLogin, wishlistProducts])

    const toggleHeart = () => {
        if (!isLogin) {
            alert("Ready to Wish List it? Sign in to your member account.")
        } else {
            if (heartActive) {
                dispatch(removeFromWishlist(product.productId));
                setHeartActive(false);
                alert("Product removed from your wishlist!")
            } else {
                dispatch(addToWishlist({
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    image: images[0]
                }));
                setHeartActive(true);
                alert("Product added to your wishlist!");
            }
    }};

    return (
        <>
            <Carousel
                showThumbs={true}
                showArrows={true}
                dynamicHeight={true}
                infiniteLoop={true}
            >
                {images.map((image, index) => (
                    <div className='imagesContainer' key={index} onClick={handleModalOpen}>
                        <img className='images' src={image} alt={alt}/>
                        <div className="heartContainer"
                             onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the modal
                            toggleHeart();
                        }}>
                            <button className={`heartButton ${heartActive ? 'active' : ''}`}>
                                ♥
                            </button>
                        </div>

                    </div>
                ))}
            </Carousel>
        </>

    )
}
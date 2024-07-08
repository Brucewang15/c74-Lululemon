import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Header} from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {myKey, productURL, singleProductURL} from "../redux/utils/helper";
import '../components/productpage/ProductPage.scss'
import {Modal} from "../components/productpage/Modal";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {ImageCarousel} from "../components/productpage/ImageCarousel";
import {Swatches} from "../components/productpage/Swatches";
import {SizeButtons} from "../components/productpage/SizeButtons";
import {AddToBag} from "../components/productpage/AddToBag";
import {ProductDetails} from "../components/productpage/ProductDetails";
import {WhyWeMadeThis} from "../components/productpage/WhyWeMadeThis";

import {Reviews} from "../components/productpage/Reviews";
import {useDispatch, useSelector} from "react-redux";
import YouMayLikeSide from "../components/productpage/YouMayLikeSide";
import YouMayLike from "../components/productpage/YouMayLike";
import AddToBagModal from "../components/productpage/AddToBagModal";
import {fetchFirstPageProducts} from "../redux/utils/api";
import {addItems, fetchCartItems, updateQuantity} from "../redux/actions/shoppingCartActions";

export const ProductPage = () => {
    // Router
    const {productID, colorID} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    // useStates
    const [product, setProduct] = useState({})
    const [selectedColorId, setSelectedColorId] = useState(null)
    const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(null)
    // const [selectedSize, setSelectedSize] = useState(false)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(null)
    const [selectedLengthIndex, setSelectedLengthIndex] = useState(null);
    const [swatchName, setSwatchName] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedLength, setSelectedLength] = useState('');
    const [isSizeSelected, setIsSizeSelected] = useState(false)
    const [isSizeGroup, setIsSizeGroup] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [expandedIndex, setExpendedIndex] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0)

    const [bagModalOpen, setBagModalOpen] = useState(false)
    const [recommendedProducts, setRecommendedProducts] = useState([])

    const refs = useRef([])

    //const products = useSelector(state => state.filterReducer.products) || [];
    const [products, setProducts] = useState([]);
    const youMayLikeProducts = products.slice(0, 4);

    // calculate the total number of items in cart
    const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await fetchFirstPageProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);


    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const colorId = params.get('colorId')
        axios.get(`${singleProductURL}/${productID}?mykey=${myKey}`)
            .then(res => {
                const productData = res.data.rs
                console.log('productData ===>', productData)
                if (!productData || !productData.images || productData.images.length === 0) {
                    navigate('/wrong-product')
                }
                setProduct(productData)
                refs.current = productData.featurePanels?.map(() => React.createRef());
                // 默认选中第一个颜色的图片
                if (colorId) {
                    setSelectedColorId(colorId)
                    const swatchIndex = productData.swatches.findIndex(swatch => swatch.colorId === colorId);
                    if (swatchIndex !== -1) {
                        setSelectedSwatchIndex(swatchIndex);
                        setSwatchName(productData.swatches[swatchIndex].swatchAlt);
                    }
                } else if (productData.images && productData.images.length > 0) {
                    // selectedColorId(colorID)
                    setSelectedColorId(productData.images[0].colorId);
                }

            })
            .catch(error => {
                console.log('error fetching product', error)
                navigate('/wrong-product')
            })

    }, [productID, colorID]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productID, colorID]);

    // Define a function to get the images based on selected swatch
    const getCurrentImagesAndAlts = () => {
        const currentImages = product.images?.find(image => image.colorId === selectedColorId)
        if (currentImages) {
            return {
                images: currentImages.mainCarousel.media.split('|').map(img => img.trim()),
                alt: currentImages.mainCarousel.alt
            }
        }
        return {
            images: [],
            alt: 'No Alt'
        }
    }


    const {images, alt} = getCurrentImagesAndAlts()


    const handleSwatchClick = (colorID, index, swatchName) => {
        setSelectedColorId(colorID)
        setSelectedSwatchIndex(index)
        setSwatchName(swatchName)
        navigate(`/product/${productID}?colorId=${colorID}`);
    }
    const handleSizeButtonClick = (size, index, groupTitle) => {
        // setSelectedSize(!selectedSize)
        setSelectedSizeIndex(index)
        setSelectedSize(size)

        setIsSizeSelected(true)
        setIsSizeGroup(true)
    }
    const handleLengthButtonClick = (length, index) => {
        setSelectedLengthIndex(index);
        setSelectedLength(length);
        setIsSizeSelected(true);
        setIsSizeGroup(false)
    }

    const handleModalOpen = () => {
        setIsModalVisible(true)
        setScrollPosition(window.scrollY)
    }

    const handleModalClose = () => {
        setIsModalVisible(false)
        window.scrollTo(0, scrollPosition)
    }
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleScrollAndExpand = (index) => {
        setExpendedIndex(index); // 设置展开的面板索引
        if (refs.current && refs.current.length > 0 && index < refs.current.length) {
            refs.current[index].current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleAddToBag = () => {
        //console.log(product.sizes[0].details !== 0 && !selectedSize);
        if (product.sizes[0].details.length !== 0 && !selectedSize) {
            alert("Please select a size.");
            return;
        }
        const newPrice = product.price.replace('$', '').trim();
        const productPrice = Number(parseInt(newPrice.slice(0, newPrice.indexOf(' '))));
        console.log("product price: ", productPrice);
        const cartItem = {
            productId: productID,
            colorId: selectedColorId,
            size: selectedSize,
            quantity: 1,
            price: productPrice,
        };

        axios.post('http://localhost:8000/cart/add', cartItem)
            .then(response => {
                //alert('Item added to cart');
                console.log('Item added to cart:', response.data);

                const existingItemIndex = shoppingCart.findIndex(item =>
                    item.productId === cartItem.productId &&
                    item.colorId === cartItem.colorId &&
                    item.size === cartItem.size
                );

                if (existingItemIndex !== -1) {
                    // If item exists, update the quantity in the Redux store
                    const updatedItem = {
                        ...shoppingCart[existingItemIndex],
                        quantity: shoppingCart[existingItemIndex].quantity + 1
                    };
                    dispatch(updateQuantity(updatedItem.quantity, existingItemIndex, updatedItem._id));
                } else {
                    // If item does not exist, add the new item to the Redux store
                    dispatch(addItems(cartItem));
                }
                console.log(shoppingCart)
                dispatch(fetchCartItems())
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
                //alert('Failed to add item to cart');
            });
        //navigate('/shop/mybag')
        fetchRecommendedProducts();
        setBagModalOpen(true);
    };

    const fetchRecommendedProducts = async (colorId) => {
        try {

            // Filter the first 4 products that have the same color ID as the added product
            const filteredProducts = products
                .filter(product => product.swatches.some(swatch => swatch.colorId === colorId))
                .slice(0, 4);
            if (filteredProducts.length > 0) {
                setRecommendedProducts(filteredProducts);
            } else {
                setRecommendedProducts(youMayLikeProducts);
            }


            // console.log(filteredProducts);
            // console.log(products);
        } catch (error) {
            console.error('Error fetching recommended products', error);
        }
    };

    if (!product) {
        return <div>loading</div>
    }


    return (
        <>
            <div className={isModalVisible === true ? 'productPageWrapperHidden' : 'productPageWrapperActive'}>
                <Header/>
                <div className='productPageContainer'>
                    <div className='productInfoContainer'>

                        <div className='productImagesContainer'>
                            <ImageCarousel images={images} handleModalOpen={handleModalOpen} alt={alt}/>
                            {/*<button className="heartButton">*/}
                            {/*    <div className="heart">&#x2665;</div>*/}
                            {/*</button>*/}
                        </div>
                        <div className='productInfo'>
                            <Link to='/'><h4>What's New Page</h4></Link>
                            <div className='productName'>{product.name}</div>
                            <div className='productPrice'>{product.price}</div>

                            <div className='colorWord'>Colour
                                <div className='colorName wordStyle'>{swatchName}</div>
                            </div>
                            <Swatches product={product} handleSwatchClick={handleSwatchClick}
                                      selectedSwatchIndex={selectedSwatchIndex}/>
                            <SizeButtons product={product} isSizeSelected={isSizeSelected}
                                         selectedSize={selectedSize}
                                         selectedSizeIndex={selectedSizeIndex}
                                         handleSizeButtonClick={handleSizeButtonClick}
                                         handleLengthButtonClick={handleLengthButtonClick}
                                         isSizeGroup={isSizeGroup}
                                         selectedLength={selectedLength}
                                         selectedLengthIndex={selectedLengthIndex}
                            />

                            <AddToBag isExpanded={isExpanded}
                                      handleExpand={handleExpand}
                                      product={product}
                                      selectedSize={selectedSize}
                                      colorId={selectedColorId}
                                      handleAddToBag={handleAddToBag}
                            />
                            <ProductDetails product={product} refs={refs} handleScroll={handleScrollAndExpand}/>
                        </div>
                        <YouMayLikeSide products={youMayLikeProducts}/>

                    </div>
                    {product.whyWeMadeThis &&
                        <WhyWeMadeThis product={product} images={images} alt={alt} refs={refs}
                                       expandedIndex={expandedIndex} setExpendedIndex={setExpendedIndex}/>}
                </div>

                <br/>

                <YouMayLike products={youMayLikeProducts}/>

                <Reviews/>
                <Footer/>
            </div>
            {/*Here is the modal, you can close and open it*/}
            {isModalVisible && <Modal images={images} close={handleModalClose} alt={alt} name={product.name}/>}
            <AddToBagModal
                product={product}
                recommendedProducts={recommendedProducts}
                isOpen={bagModalOpen}
                onClose={() => setBagModalOpen(false)}
                image={images[0]}
                selectedSize={selectedSize}
                totalItems={totalItems}
            />
        </>
    )
}


import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Header} from "../shared/Header";
import Footer from "../shared/Footer";
import {useEffect, useState} from "react";
import axios from "axios";
import {myKey, productURL, singleProductURL} from "../../redux/helper";
import './ProductPage.scss'
import {Modal} from "./Modal";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const ProductPage = () => {
    // Router
    const {productID, colorID} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    // useStates
    const [product, setProduct] = useState({})
    const [selectedColorId, setSelectedColorId] = useState(null)
    const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(null)
    // const [selectedSize, setSelectedSize] = useState(false)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(null)
    const [swatchName, setSwatchName] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [isSizeSelected, setIsSizeSelected] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

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

    }, [productID]);

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
    // Define a function to get
    // the images's alt based on selected swatch

    const {images, alt} = getCurrentImagesAndAlts()


    const handleSwatchClick = (colorID, index, swatchName) => {
        setSelectedColorId(colorID)
        setSelectedSwatchIndex(index)
        setSwatchName(swatchName)
        navigate(`/product/${productID}?colorId=${colorID}`);
    }
    const handleSizeButtonClick = (size, index) => {
        // setSelectedSize(!selectedSize)
        setSelectedSizeIndex(index)
        setSelectedSize(size)
        setIsSizeSelected(true)
    }

    const handleModalOpen = () => {
        setIsModalVisible(true)
    }

    const handleModalClose = () => {
        setIsModalVisible(false)
    }
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

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
                            <Carousel showThumbs={true} showArrows={true} dynamicHeight={true} infiniteLoop={true}>
                                {images.map((image, index) => (
                                    <div key={index} onClick={handleModalOpen}>
                                        <img className='images' src={image} alt={alt} />
                                    </div>
                                ))}
                            </Carousel>
                            {/*<button className="heartButton">*/}
                            {/*    <div className="heart">&#x2665;</div>*/}
                            {/*</button>*/}
                        </div>
                        <div className='productInfo'>
                            <div className='productName'>{product.name}</div>
                            <div className='productPrice'>{product.price}</div>

                            <div className='colorWord'>Colour
                                <div className='colorName wordStyle'>{swatchName}</div>
                            </div>
                            <div className='swatchesContainer'>
                                {product.swatches && product.swatches.map((swatch, index) => {
                                    return (

                                        <button key={index}
                                                className='swatchButton'
                                                onClick={() => handleSwatchClick(swatch.colorId, index, swatch.swatchAlt)}>
                                            <img className={`swatch ${selectedSwatchIndex === index ? 'selected' : ''}`}
                                                 src={swatch.swatch}
                                                 alt={swatch.swatchAlt}
                                            />
                                        </button>

                                    )
                                })}
                            </div>
                            <div className='sizeContainer'>
                                {product.sizes && product.sizes.map((sizeGroup, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='selectSizeWord'>{isSizeSelected ? 'Size' : sizeGroup.title}
                                                <div className='wordStyle'> {selectedSize}</div>
                                            </div>
                                            <div className='sizeButtonsContainer'>
                                                {sizeGroup.details.map((size, i) =>
                                                    <button
                                                        className={`${selectedSizeIndex === i ? 'sizeLettersButtonChecked' : 'sizeLettersButton'} `}
                                                        key={i}
                                                        onClick={() => handleSizeButtonClick(size, i)}
                                                    >{size ? size : 'nosize'}</button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className='soldoutWord'>Size sold out? Select size to get notified</div>
                            </div>
                            <div className='addToBagContainer'>
                                <div className='ship'>
                                    <label className='shipLabel' htmlFor="ship1">
                                        <input id='ship1' className='ship1' type="radio"/> <h3>Ship it to me</h3>
                                    </label>
                                    <span>Free shipping and returns</span>
                                </div>
                                <div className='pickupContainer'>
                                    <StorefrontOutlinedIcon className='pickupIcon'/>

                                    <h3>Pick up in store</h3>
                                    <div className='expand'>
                                        {isExpanded === false ?
                                            <div className='horizontal' onClick={handleExpand}>+</div> :
                                            <div className='vertical' onClick={handleExpand}><RemoveIcon/></div>}
                                    </div>
                                </div>
                                {isExpanded === true && (
                                    <div className='pickUpInfoContainer'>
                                        <div className='pickUpInfo'>
                                            Available for Buy & Pick-Up at these locations in Toronto, Ontario Change
                                            Locations
                                            Pick up in-store within 2 hours.
                                        </div>
                                        <label htmlFor="locationInput">
                                            <input type="radio" id='locationInput' className='locationInput'/> Sherway
                                            Gardens (15.2 km)
                                        </label>
                                    </div>)}
                                <div className='buttonContainer'>
                                    <button className='button1'>ADD TO BAG</button>
                                </div>
                                <div className='otherStoreContainer'>
                                    <button className='button2'>Check All Store Inventory</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Details go here*/}
                <div>Why We Made This
                    <div>{product.whyWeMadeThis}</div>
                </div>
                <div>
                    {/*底下这俩都是返回Whats New Page。看你们爱用哪个都行*/}
                    <Link to='/'>To What's New Page </Link>
                    <br/>
                    <button onClick={() => navigate('/')}>Go Back to What's New Page</button>
                </div>
                <Footer/>
            </div>
            {/*Here is the modal, you can close and open it*/}
            {isModalVisible && <Modal images={images} close={handleModalClose} alt={alt} name={product.name}/>}
        </>
    )
}

import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Header} from "../shared/Header";
import Footer from "../shared/Footer";
import {useEffect, useState} from "react";
import axios from "axios";
import {myKey, productURL, singleProductURL} from "../../redux/helper";
import './ProductPage.scss'

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

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const colorId = params.get('colorId')
        axios.get(`${singleProductURL}/${productID}?mykey=${myKey}`)
            .then(res => {
                const productData = res.data.rs
                console.log('productData ===>', productData)
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
            })

    }, [productID]);

    // Define a function to get the images based on selected swatch
    const getCurrentImages = () => {
        const currentImages = product.images?.find(image => image.colorId === selectedColorId)
        if (currentImages) {
            const imagesUrl = currentImages.mainCarousel.media.split('|').map(img => img.trim())
            return imagesUrl
        }
        return []
    }
    // Define a function to get
    // the images's alt based on selected swatch
    const getCurrentImageAlt = () => {
        const currentImages = product.images?.find(image => image.colorId === selectedColorId)
        if (currentImages) {
            const currentAlt = currentImages.mainCarousel.alt
            return currentAlt
        }
        return 'No Alt'
    }

    const images = getCurrentImages()
    const alt = getCurrentImageAlt()

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

    if (!product) {
        return <div>loading</div>
    }


    return (
        <>
            <Header/>
            <div className='productPageContainer'>
                <h3>this is productID : {productID}</h3>
                <div className='productInfoContainer'>

                    <div className='productImagesContainer'>
                        {images.map((image, index) => {
                                return <img className='images' key={index} src={image}
                                            alt={alt}/>
                            }
                        )}
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
                                    <>
                                        <button key={index}
                                                className='swatchButton'
                                                onClick={() => handleSwatchClick(swatch.colorId, index, swatch.swatchAlt)}>
                                            <img className={`swatch ${selectedSwatchIndex === index ? 'selected' : ''}`}
                                                 src={swatch.swatch}
                                                 alt={swatch.swatchAlt}
                                            />
                                        </button>
                                    </>
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
        </>
    )
}
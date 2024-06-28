import './EditPopUp.scss'
import {CartCarousel} from "./CartCarousel";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {edtCart} from "../../redux/actions/shoppingCartActions";

export const EditPopUp = ({product, item, sizeInit, colorInit, index, closeOut}) => {
    console.log('popUpProduct', product)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const price = product.price.slice(0, product.price.indexOf('C')).trim()
    const [colorId, setColorId] = useState(colorInit)
    const [colorDes, setColorDes] = useState()
    const [size, setSize] = useState(sizeInit)
    // const [images, setImages] = useState([])

    useEffect(() => {
        product.swatches.map(item => {
                if (item.colorId === colorId) {
                    setColorDes(item.swatchAlt)
                }
            }
        )
    }, [colorId]);


    // useEffect(() => {
    //     const productImages = product.images.filter(item => item.colorId === colorId)
    //     setImages(productImages[0].mainCarousel.media)
    // }, []);


    const handleUpdateBag = (itemId, index, size, colorId) => {
        dispatch(edtCart(size, colorId, index, itemId))
        closeOut(index)
    }

    return <div className="editPopUp">
        {JSON.stringify(typeof(images))}
        <div className="productEdit">
            <div className="carousel"><CartCarousel product={product} colorSelected={colorId}/></div>
            <div className="detailEdit">
                <div className="title">{product.name}</div>
                <div className="price">{`${price}.00`}</div>
                <div className="selectedColor">Color: {colorDes}</div>
                <div className="swatchesGroup">
                    {product.swatches.map((item, index) => {
                        if (item.colorId === colorId) {
                            return <div
                                className='swatchImgSelected'
                                style={{background: `url(${item.swatch})`}}
                            ></div>
                        } else {
                            return <div
                                className='swatchImg'
                                style={{background: `url(${item.swatch})`}}
                                onClick={() => {
                                    setColorId(item.colorId)
                                    setColorDes(item.swatchAlt)
                                }}
                            ></div>
                        }
                    })}
                </div>
                <div className="selectedSize">Size: {size}</div>
                <div className="sizesGroup">
                    {product.sizes[0].details.map((item, index) => {
                            if (item === size) {
                                return <button className='sizeBtnSelected'>{item}</button>
                            } else {
                                return <button className='sizeBtn'
                                               onClick={() => {
                                                   setSize(item)
                                               }}>{item}</button>
                            }
                        }
                    )}
                </div>
                <button className="updateBtn" onClick={() => {handleUpdateBag(item._id, index, size, colorId)}}>UPDATE ITEM</button>
                <div className="viewDetails" onClick={() => {navigate(`../../product/${item.productId}?colorId=${colorId}`)}}>View product details</div>
                <div className='closeOutBtn' onClick={() => closeOut(index)}>x</div>
            </div>
        </div>
    </div>
}
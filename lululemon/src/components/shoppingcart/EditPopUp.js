import './EditPopUp.scss'
import {CartCarousel} from "./CartCarousel";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {edtCart, fetchCartItems} from "../../redux/actions/shoppingCartActions";
import {fetchProductDetails} from "../../redux/utils/api";

export const EditPopUp = ({ productId, item, sizeInit, colorInit, index, closeOut }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [colorId, setColorId] = useState(colorInit);
    const [colorDes, setColorDes] = useState('');
    const [size, setSize] = useState(sizeInit);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await fetchProductDetails(productId);
            setProduct(fetchedProduct);
            const swatch = fetchedProduct.swatches.find(swatch => swatch.colorId === colorId);
            if (swatch) {
                setColorDes(swatch.swatchAlt);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [productId, colorId]);
    useEffect(() => {
        if (product) {
            const currentImage = product.images.find(image => image.colorId === colorId);
            if (currentImage) {
                setCurrentImage(currentImage.mainCarousel.media.split('|')[0].trim());
            }
        }
    }, [product, colorId]);
    if (loading) return <div>Loading...</div>;

    const price = parseFloat(product.price.replace('$', '').trim());



    const handleUpdateBag = (itemId, index, size, colorId, colorDes, image) => {
        console.log("HANDLE UPDATE BAG CURRENT IMAGE", currentImage);
        console.log(image);
        dispatch(edtCart(size, colorId, index, colorDes, image));
        dispatch(fetchCartItems());
        closeOut(index);
    }

    return (
        <div className="editPopUp">
            <div className="productEdit">
                <div className="carousel">
                    <CartCarousel product={product} colorSelected={colorId} />
                </div>
                <div className="detailEdit">
                    <div className="title">{product.name}</div>
                    <div className="price">${price}</div>
                    <div className="selectedColor">Color: {colorDes}</div>
                    <div className="swatchesGroup">
                        {product.swatches.map((swatch, index) => (
                            <div
                                key={index}
                                className={swatch.colorId === colorId ? 'swatchImgSelected' : 'swatchImg'}
                                style={{ background: `url(${swatch.swatch})` }}
                                onClick={() => setColorId(swatch.colorId)}
                            ></div>
                        ))}
                    </div>
                    <div className="selectedSize">Size: {size}</div>
                    <div className="sizesGroup">
                        {product.sizes[0].details.map((item, index) => (
                            <button
                                key={index}
                                className={item === size ? 'sizeBtnSelected' : 'sizeBtn'}
                                onClick={() => setSize(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <button className="updateBtn" onClick={() => handleUpdateBag(item._id, index, size, colorId, colorDes, currentImage)}>
                        UPDATE ITEM
                    </button>
                    <div className="viewDetails" onClick={() => navigate(`../../product/${productId}?colorId=${colorId}`)}>
                        View product details
                    </div>
                    <div className='closeOutBtn' onClick={() => closeOut(index)}>x</div>
                </div>
            </div>
        </div>
    );
}

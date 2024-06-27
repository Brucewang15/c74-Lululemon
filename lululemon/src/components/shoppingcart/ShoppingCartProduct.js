import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, removeProduct} from "../../redux/actions/shoppingCartActions";
import './ShoppingCartProduct.scss'
import {OrderSummary} from "./OrderSummary";
import {useEffect, useState} from "react";
import {fetchProductDetails} from "../../redux/utils/api";
import {EditPopUp} from "./EditPopUp";

export const ShoppingCartProduct = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState([]);
    const [isVisibleEdit, setIsVisibleEdit] = useState(Array(shoppingCart.length).fill(false))

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(shoppingCart.map(item => fetchProductDetails(item.productId)));
            setProductDetails(details);
        };
        fetchDetails();
    }, [shoppingCart]);

    const getCurrentImage = (item, productDetail) => {
        const currentImage = productDetail?.images?.find(image => image.colorId === item.colorId);
        if (currentImage) {
            return {
                image: currentImage.mainCarousel.media.split('|')[0].trim(),
                colorAlt: currentImage.colorAlt,
            };
        }
        return {
            image: '',
            colorAlt: 'No Color Alt',
        };
    };

    const convertPriceToNumber = (price) => {

        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate, and then convert it to '$85.00' form.
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(parseInt(newPrice.slice(0, newPrice.indexOf(' '))));
            // console.log('newPrice:', newPrice, 'priceNumber:', priceNumber, 'typeof PriceNumber:', typeof priceNumber)
            return `$${priceNumber.toFixed(2)}`;
        } catch (error) {
            console.error('Error converting price:', error);
            return '$0.00';
        }
    }
    const calcTotalPrice = (price, quantity) => {
        //console.log(price)
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(parseInt(newPrice.slice(0, newPrice.indexOf(' '))));
            if (isNaN(priceNumber) || isNaN(quantity)) {
                throw new Error('Invalid number format');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate the total price with quantity, and then convert it to '$85.00' form.
            const totalPrice = (priceNumber * quantity);
            console.log('typeof totalPrice:', typeof totalPrice, totalPrice)

            return `$${totalPrice.toFixed(2)}`;
        } catch (error) {
            console.error('Error calculating total price:', error);
            return '$0.00';
        }
    }
    const handleEditPopUp = (index) => {
        console.log('index', index, 'arr', isVisibleEdit)
        const newState = isVisibleEdit.map((item, i) => i === index ? !item : item)
        setIsVisibleEdit(newState)
    }

    const handleQuantityChange = (e, index) => {
        const newQuantity = Number(e.target.value)
        dispatch(changeQuantity(newQuantity, index))
    }

    const handleRemoveProduct = (productID, selectedSize, selectedColorId) => {
        dispatch(removeProduct(productID, selectedSize, selectedColorId))
    }
    return (
        <div className='shoppingCartWrapper'>
            <div className='shoppingCartBody'>
                <div className='itemCountContainer'>
                    <div className='itemCount'>
                        <span className='wordMyBag'>My Bag </span>
                        <span
                            className='wordItem'>({shoppingCart.length} {shoppingCart.length > 1 ? 'Items' : 'Item'})</span>
                    </div>
                </div>
                <div className='textContainer'>
                    <AccessAlarmTwoToneIcon/>
                    <p className='text'>These items are going fast! Checkout now to make them yours.</p>
                </div>
                <div className='itemsContainer'>
                    {shoppingCart.map((item, index) => {
                        const productDetail = productDetails[index];
                        console.log(productDetail)
                        const { image, colorAlt } = getCurrentImage(item, productDetail);
                        return (
                            <div key={index} className='itemContainer'>
                                <img className='productImage' src={image} alt={colorAlt} />
                                <div className='productDetailsContainer'>
                                    <h3 className='productName'>{productDetail?.name}</h3>
                                    <p className='productColor'>{colorAlt}</p>
                                    <div className='productDetails'>
                                        <div className='sizeAndEditContainer'>
                                            <div className='size'>
                                                Size {item.size}
                                            </div>
                                            <button className='edit button'
                                                    onClick={() => handleEditPopUp(index)}>Edit</button>
                                        </div>
                                        <div className='productDetailsRight'>
                                            <div className='priceContainer'>
                                                <div>Item Price</div>
                                                <div>{convertPriceToNumber(productDetail?.price)}</div>
                                            </div>
                                            <div className='quantityContainer'>
                                                <label htmlFor={`quantity-${index}`}>Quantity</label>
                                                <select
                                                    className='dropdownMenu'
                                                    id={`quantity-${index}`}
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(e, index)}
                                                >
                                                    {[...Array(5).keys()].map(i => (
                                                        <option className='dropdownItem' key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='totalPriceContainer'>
                                                <div>Total Price</div>
                                                {calcTotalPrice(productDetail?.price, item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='shippingAndReturnContainer'>
                                        <div>
                                            Free Shipping + Free Returns
                                        </div>
                                        <div className='removeContainer'>
                                            <button className='save button'>Save for Later</button>
                                            <button className='remove button' onClick={() => handleRemoveProduct(item.productId, item.size, item.colorId)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                                {isVisibleEdit[index] &&
                                    <EditPopUp product={productDetail} key={index} closeOut={() => handleEditPopUp(index)}/>
                                }
                            </div>
                        );
                    })}
                    <div className='savedForLaterContainer'>
                        <h2>Saved for Later</h2>
                        <p><span>Sign in</span> or <span> create a member account</span> to view your saved items.</p>
                    </div>
                </div>

            </div>
            <div className='orderSummary'>
                <OrderSummary/>
            </div>
        </div>
    )
}
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, fetchCartItems, removeProduct} from "../../redux/actions/shoppingCartActions";
import './ShoppingCartProduct.scss'
import {OrderSummary} from "./OrderSummary";
import {useEffect, useState} from "react";
import {fetchProductDetails} from "../../redux/utils/api";
import axios from "axios";
import {RemoveItemModal} from "./RemoveItemModal";
import {EditPopUp} from "./EditPopUp";

export const ShoppingCartProduct = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [isVisibleEdit, setIsVisibleEdit] = useState(Array(shoppingCart.length).fill(false))
    const sizesSelected = []
    const [totalPrice, setTotalPrice] = useState(0)


    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(shoppingCart.map(item => fetchProductDetails(item.productId)));
            setProductDetails(details);
        };
        fetchDetails();
    }, [shoppingCart]);

    useEffect(() => {
        const total = shoppingCart.reduce((acc, item, index) => {
            const productDetail = productDetails[index];
            if (productDetail) {
                const newPrice = productDetail.price.replace('$', '').trim();
                const priceNumber = Number(parseInt(newPrice.slice(0, newPrice.indexOf(' '))));
                return acc + (priceNumber * item.quantity);
            }
            return acc;
        }, 0);
        setTotalPrice(total.toFixed(2));
    }, [shoppingCart, productDetails]);

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
        if (!price) {
            return '$0.00';
        }
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate, and then convert it to '$85.00' form.
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(newPrice.slice(0, newPrice.indexOf('C')).trim()).toFixed(2);
            // console.log('newPrice:', newPrice, 'priceNumber:', priceNumber, 'typeof PriceNumber:', typeof priceNumber)
            return `$${priceNumber}`;
        } catch (error) {
            console.error('Error converting price:', error);
            return '$0.00';
        }
    }
    const calcTotalPrice = (price, quantity) => {
        if (!price) {
            return '$0.00';
        }
        //console.log(price)
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(newPrice.slice(0, newPrice.indexOf('C')).trim());
            if (isNaN(priceNumber) || isNaN(quantity)) {
                throw new Error('Invalid number format');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate the total price with quantity, and then convert it to '$85.00' form.

            const totalPrice = (priceNumber * quantity).toFixed(2);
            // console.log('typeof totalPrice:', typeof totalPrice, totalPrice)

            return `$${totalPrice}`;
        } catch (error) {
            console.error('Error calculating total price:', error);
            return '$0.00';
        }
    }
    const handleCloseOut = (index) => {
        console.log('index', index, 'arr', isVisibleEdit)
        const newState = isVisibleEdit.map((item, i) => i === index ? !item : item)
        setIsVisibleEdit(newState)
    }

    // const handleQuantityChange = (e, index) => {
    //     const newQuantity = Number(e.target.value)
    //     dispatch(changeQuantity(newQuantity, index))
    // }

    const handleQuantityChange = (e, index, itemId) => {
        const newQuantity = Number(e.target.value);
        dispatch(changeQuantity(newQuantity, index, itemId));
    }

    const handleRemoveProduct = (itemId, selectedSize, selectedColorId) => {
        axios.delete(`http://localhost:8000/cart/delete/${itemId}`)
            .then(response => {
                // 你可以在这里调用Redux action来更新前端的购物车状态
                dispatch(removeProduct(itemId, selectedSize, selectedColorId));
                console.log('Item removed from cart:', response.data);
                dispatch(fetchCartItems());
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
            });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
    }
    const handleOpenModal = (item) => {
        setIsModalOpen(true)
        setSelectedItem(item)
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

                        const {image, colorAlt} = getCurrentImage(item, productDetail);
                        sizesSelected.push(item.size)
                        return (
                            <div key={index} className='itemContainer'>
                                <img className='productImage' src={image} alt={colorAlt}/>
                                <div className='productDetailsContainer'>
                                    <h3 className='productName'>{productDetail?.name}</h3>
                                    <p className='productColor'>{colorAlt}</p>
                                    <div className='productDetails'>
                                        <div className='sizeAndEditContainer'>
                                            <div className='size'>
                                                Size {item.size}
                                            </div>
                                            <button className='edit button'
                                                    onClick={() => handleCloseOut(index)}>Edit
                                            </button>
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
                                                    onChange={(e) => handleQuantityChange(e, index, item._id)}
                                                >
                                                    {[...Array(5).keys()].map(i => (
                                                        <option className='dropdownItem' key={i + 1}
                                                                value={i + 1}>{i + 1}</option>
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
                                            {/*<button className='remove button'*/}
                                            {/*        onClick={() => handleRemoveProduct(item._id, item.size, item.colorId)}>Remove*/}
                                            {/*</button>*/}
                                            <button className='remove button'
                                                    onClick={() => handleOpenModal(item)}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {isVisibleEdit[index]
                                    && <EditPopUp product={productDetails[index]}
                                                  item={item} sizeInit={sizesSelected[index]}
                                                  colorInit={item.colorId}
                                                  index={index}
                                                  closeOut={handleCloseOut}/>
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
                <OrderSummary totalPrice={totalPrice}/>
            </div>
            {isModalOpen === true &&
                <RemoveItemModal closeModal={handleCloseModal} handleRemoveProduct={handleRemoveProduct}
                                 item={selectedItem}/>}
        </div>
    )
}
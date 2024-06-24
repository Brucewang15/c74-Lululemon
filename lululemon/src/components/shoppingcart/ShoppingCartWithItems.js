import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity} from "../../redux/actions/shoppingCartActions";
import './ShoppingCartWithItems.scss'
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';

export const ShoppingCartWithItems = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const dispatch = useDispatch()
    const getCurrentImage = (item) => {
        const currentImage = item.images?.find(image => image.colorId === item.selectedColorId)
        if (currentImage) {
            return {
                image: currentImage.mainCarousel.media.split('|')[0].trim(),
                colorAlt: currentImage.colorAlt
            }
        }
        return {
            image: '',
            colorAlt: 'No Color Alt',
        }
    }
    const convertPriceToNumber = (price) => {
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate, and then convert it to '$85.00' form.
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(newPrice.slice(0, newPrice.indexOf(' '))).toFixed(2);
            return `$${priceNumber}`;
        } catch (error) {
            console.error('Error converting price:', error);
            return '$0.00';
        }
    }
    const calcTotalPrice = (price, quantity) => {
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(newPrice.slice(0, newPrice.indexOf(' ')));
            if (isNaN(priceNumber) || isNaN(quantity)) {
                throw new Error('Invalid number format');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate the total price with quantity, and then convert it to '$85.00' form.
            const totalPrice = (priceNumber * quantity).toFixed(2);
            return `$${totalPrice}`;
        } catch (error) {
            console.error('Error calculating total price:', error);
            return '$0.00';
        }
    }

    const handleQuantityChange = (e, index) => {
        const newQuantity = Number(e.target.value)
        dispatch(changeQuantity(newQuantity, index))
    }

    return (
        <div className='shoppingCartContainer'>
            <div className='shoppingCartHeader'>
                <img
                    src='https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg'
                    alt="logo"/>
                <div className='signInContainer'><PermIdentitySharpIcon/> Sign in</div>

            </div>
            <div className='itemCountContainer'>
                <div className='itemCount'>My Bag ({shoppingCart.length} Item)</div>
                <div className='textContainer'>
                    <AccessAlarmTwoToneIcon/>
                    <p className='text'>These items are going fast! Checkout now to make them yours.</p>
                </div>
            </div>
            <div className='itemsContainer'>
                {shoppingCart.map((item, index) => {
                    const {image, colorAlt} = getCurrentImage(item)
                    return (
                        <div key={index} className='itemContainer'>
                            <img className='productImage' src={image} alt={colorAlt}/>
                            {/*<img src={  item.images[0].mainCarousel.media.split('|')[0].trim()} alt={item.name}/>*/}
                            <div className='productInfo'>
                                <h3>{item.name}</h3>
                                <h4>{colorAlt}</h4>
                            </div>
                            <div className='productDetails'>
                                <div className='sizeAndEditContainer'>
                                    <div className='size'>
                                        Size {item.selectedSize}
                                    </div>
                                    <span>Edit</span>
                                </div>
                                <div className='priceContainer'>
                                    <div>Item Price</div>

                                    <div>{convertPriceToNumber(item.price)}</div>
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
                                    {calcTotalPrice(item.price, item.quantity)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
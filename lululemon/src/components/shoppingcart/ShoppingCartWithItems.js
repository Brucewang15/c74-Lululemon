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
            <div className='shoppingCartBody'>
                <div className='itemCountContainer'>
                    <div className='itemCount'>
                        <span className='wordMyBag'>My Bag</span>
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
                        const {image, colorAlt} = getCurrentImage(item)
                        return (
                            <div key={index} className='itemContainer'>
                                <img className='productImage' src={image} alt={colorAlt}/>
                                {/*<img src={  item.images[0].mainCarousel.media.split('|')[0].trim()} alt={item.name}/>*/}
                                <div className='productDetailsContainer'>
                                    <h3 className='productName'>{item.name}</h3>
                                    <p className='productColor'>{colorAlt}</p>
                                    <div className='productDetails'>
                                        <div className='sizeAndEditContainer'>
                                            <div className='size'>
                                                Size {item.selectedSize}
                                            </div>
                                            <button className='edit button'>Edit</button>
                                        </div>
                                        <div className='productDetailsRight'>
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
                                                        <option className='dropdownItem' key={i + 1}
                                                                value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div className='totalPriceContainer'>

                                                <div>Total Price</div>
                                                {calcTotalPrice(item.price, item.quantity)}
                                            </div>
                                        </div>

                                    </div>
                                    <div className='shippingAndReturnContainer'>
                                        <div>
                                            Free Shipping + Free Returns
                                        </div>
                                        <div className='removeContainer'>
                                            <button className='save button'>Save for Later</button>
                                            <button className='remove button'>Remove</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='shoppingCartFooter'>
                <li>
                    <ul>Contact Us</ul>
                    <ul>Live Chat</ul>
                    <ul>1.877.263.9300</ul>
                </li>
                <li>
                    <ul>Shipping Policy</ul>
                    <ul>Privacy Policy</ul>
                    <ul>Term of Use</ul>
                    <ul>Accessibility Statement</ul>
                    <ul>Your Privacy Choices</ul>
                    <ul>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</ul>
                </li>
            </div>
        </div>
    )
}
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import {useSelector} from "react-redux";

export const ShoppingCartWithItems = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
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


    return (
        <div className='shoppingCartContainer'>
            <div className='itemCount'>My Bag ({shoppingCart.length} Item)</div>
            <div className='textContainer'>
                <AccessAlarmTwoToneIcon/>
                <p className='text'>These items are going fast! Checkout now to make them yours.</p>
            </div>
            <div className='itemsContainer'>
                {shoppingCart.map((item, index) => {
                    const {image, colorAlt} = getCurrentImage(item)
                    return (
                        <div key={index} className='itemContainer'>
                            <img src={image} alt={colorAlt}/>
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
                                    {/*继续修改*/}
                                    <div>{parseFloat(item.price.slice(0, item.price.indexOf('C'))).toFixed(2)}</div>
                                </div>
                                <div className='quantityContainer'>
                                    <div>Quantity</div>
                                    {/*继续修改*/}
                                    <input type="text"/>
                                </div>
                                <div className='totalPriceContainer'>
                                    {/*继续修改*/}
                                    {parseInt(item.price) * Number(item.quantity)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
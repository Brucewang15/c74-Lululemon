import React from 'react';
import './AddToBagModal.css';

const AddToBagModal = ({ product, recommendedProducts, isOpen, onClose, image, selectedSize }) => {
    console.log(recommendedProducts);
    if (!isOpen) return null;
    let size = selectedSize;
    if (!size) {
        size = 'ONE SIZE'
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2>Nice Pick!</h2>
                    <span>{`1 Item`}</span>
                    {/*TODO: change to total items of the cart*/}
                </div>
                <div className="modal-body">
                    <div className="product-summary">
                        <img src={image} alt={product.name}/>
                        <div>
                            <h3>{product.name}</h3>
                            <p>{`Size: ${size}`}</p>
                            <p>{product.price}</p>
                        </div>
                    </div>
                    <div className="cart-summary">
                        <div className="subtotal">
                            <p>Subtotal</p>
                            <p>{product.price}</p>
                        </div>
                        <div className="modal-buttons">
                            <button className="view-bag-button">VIEW BAG & CHECKOUT</button>
                            <button className="continue-shopping-button" onClick={onClose}>Continue Shopping</button>
                        </div>
                    </div>

                </div>
                <div className="recommended-products">
                    <h3>Goes well with</h3>
                    <div className="products">
                        {recommendedProducts.map((item, index) => (
                            <div key={index} className="recommended-product">
                                <img src={item.images[0].mainCarousel.media.split('|').map(img => img.trim())[0]}
                                     alt={item.name}/>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                            // <div>{item.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToBagModal;
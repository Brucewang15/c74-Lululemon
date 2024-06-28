import React from 'react';
import './AddToBagModal.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AddToBagModal = ({product, recommendedProducts, isOpen, onClose, image, selectedSize, totalItems}) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
    let size = selectedSize;
    if (!size) {
        size = 'ONE SIZE'
    }

    const handleCheckOut = () => {
        navigate('/shop/mybag')
    }



    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2>Nice Pick!</h2>
                    <i className="fas fa-shopping-bag"></i>
                    <span>{`${totalItems} ${totalItems === 1 && totalItems !== 0 ? 'item' : 'items'}`}</span>

                </div>
                <div className="modal-body">
                    <div className="product-summary">
                        <img src={image} alt={product.name}/>
                        <div>
                            <h4>{product.name}</h4>
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
                            <button className="view-bag-button" onClick={handleCheckOut}>VIEW BAG & CHECKOUT</button>
                            <button className="continue-shopping-button" onClick={onClose}>
                                CONTINUE SHOPPING
                                <i className="fa fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="recommended-products">
                    <h2>Goes well with</h2>
                    <div className="products">
                        {recommendedProducts.map((item, index) => (
                            <div key={index} className="recommended-product">
                                <img src={item.images[0].mainCarousel.media.split('|').map(img => img.trim())[0]}
                                     alt={item.name}/>
                                <h5>{item.name}</h5>
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
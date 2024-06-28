import "./OrderSummary.css";
import {useState} from "react";


export const OrderSummary = ({totalPrice}) => {


    const [popUpText, setPopUpText] = useState('');
    const [showPopUp, setShowPopUp] = useState(null);


    const handleMoreInfo = (text, id) => {
        if (showPopUp === id) {
            setShowPopUp(null);
        } else {
            setShowPopUp(id);
            setPopUpText(text);
        }

    };

    return <>

        <div className="orderSummaryContainer">

            <div className="orderSummaryTitle">Order Summary</div>
            <div className="orderSummaryInfo">

                <div className="orderSummaryInfoSections">

                    <div className="orderSummaryInfoSectionsLeft">
                        <div className="orderSummaryInfoSectionsLeftText">Subtotal</div>
                    </div>

                    <div className="orderSummaryInfoSectionsRight">
                        {`$${totalPrice}`}
                    </div>
                </div>

                <div className="orderSummaryInfoSections">

                    <div className="orderSummaryInfoSectionsLeft">
                        <div className="orderSummaryInfoSectionsLeftText">Shipping</div>
                        <div className="moreInfo"
                             onClick={() => handleMoreInfo("We offer Free Standard Shipping on all orders within the United States. If you’d like to expedite shipping or ship to a different country, you can do so in checkout.", "shipping")}>
                            <img src="https://cdn-icons-png.flaticon.com/512/8/8201.png" alt=""/>
                            {showPopUp === "shipping" && (
                                <div className="popUp">
                                    {popUpText}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="orderSummaryInfoSectionsRight">
                        FREE
                    </div>

                </div>

                <div className="orderSummaryInfoSections">

                    <div className="orderSummaryInfoSectionsLeft">
                        <div className="orderSummaryInfoSectionsLeftText">Tax</div>


                        <div className="moreInfo" onClick={() => {
                            handleMoreInfo("Taxes are based on your shipping location’s provincial and local sales tax.", "tax")
                        }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/8/8201.png" alt=""/>
                            {showPopUp === "tax" && (
                                <div className="popUp">
                                    {popUpText}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="orderSummaryInfoSectionsRight">
                        Calculated at checkout
                    </div>

                </div>

                <div className="estimatedTotal">
                    <div className="estimatedTotalTop">
                        <div>Estimated Total</div>
                        <div>  {`$${totalPrice}`}</div>
                    </div>

                    <div className="estimatedTotalBottom">

                        <div className='wordContainer'> {`or 4 payments of  $${(totalPrice / 4).toFixed(2)} with`}</div>
                        <div className='imageContainer'>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Afterpay_logo.svg/332px-Afterpay_logo.svg.png?20201227051205"
                                alt=""/> or
                            <img
                                src="https://1000logos.net/wp-content/uploads/2022/07/Klarna-Logo.png" alt=""/>
                            <div className="moreInfo" onClick={() => {
                                handleMoreInfo("Buy items now and pay later - in 4 payments. Learn more", "payment")
                            }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/8/8201.png" alt=""/>
                                {showPopUp === "payment" && (
                                    <div className="popUp">
                                        {popUpText}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="pay">

                <button>
                    <img src="https://luxecreative.com/wp-content/uploads/2019/09/lululemon.png" alt=""/>
                    CHECKOUT
                </button>

                or checkout quickly with

                <button>
                    <img
                        src="https://i0.wp.com/cypruscomiccon.org/wp-content/uploads/2015/07/Paypal-logo-white.svg1_.png?ssl=1"
                        alt=""/>
                </button>

            </div>

        </div>

    </>
}





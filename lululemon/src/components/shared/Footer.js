import React from 'react';
import "./Footer.css";
import "../../assets/instagram.png"

const Footer = () => {
    return (<>
        <div className="footer">
            <div className="gridContainer">
                <ul className="container">
                    <li className="title">
                        <div id="miniAnimation">MY ACCOUNT</div>
                    </li>
                    <ul className="list">
                        <li><a href="#" className="component" id="miniAnimation">Membership Program</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Sign In</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Register</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Order Status</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Returns</a></li>
                    </ul>
                </ul>

                <ul className="container">
                    <li className="title">
                        <div id="miniAnimation">HELP</div>
                    </li>
                    <ul className="list">
                        <li><a href="#" className="component" id="miniAnimation">FAQ</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Accessibility Statement</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Services</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Ordering</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Shipping Policy</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Returns</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Redeem Gift Cards</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Sizing</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Our Products</a></li>

                    </ul>
                </ul>

                <ul className="container">
                    <li className="title">
                        <div id="miniAnimation">ABOUT US</div>
                    </li>
                    <ul className="list">
                        <li><a href="#" className="component" id="miniAnimation">Our Business</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Media</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Investors</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Strategic Sales</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Affiliates and Creators</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Sweat Collective</a></li>
                        <li><a href="#" className="component" id="miniAnimation">FURTHER</a></li>
                    </ul>
                </ul>

                <ul className="container">
                    <li className="title">
                        <div id="miniAnimation">CONTACT US</div>
                    </li>
                    <ul className="list">
                        <li><a href="#" className="component" id="miniAnimation">Live Chat</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Email Sign Up</a></li>
                        <li><a href="#" className="component" id="miniAnimation">Contact Us</a></li>
                    </ul>
                </ul>

                <ul className="container">

                    <ul className="list">
                        <li><a href="" className="component2" id="miniAnimation">CAREERS</a></li>
                        <li><a href="" className="component2" id="miniAnimation">COMMUNITY</a></li>
                        <li><a href="" className="component2" id="miniAnimation">SUSTAINABILITY</a></li>
                        <li><a href="" className="component2" id="miniAnimation">SOCIAL IMPACT</a></li>
                        <li><a href="" className="component2" id="miniAnimation">DIVERSITY AND INCLUSION</a></li>
                        <li><a href="" className="component2" id="miniAnimation">LULULEMON APPS</a></li>
                    </ul>

                </ul>
                <ul className="container">
                    <ul className="list">
                        <li><a href="" className="component2" id="miniAnimation">GIFT CARDS</a></li>
                        <li><a href="" className="component2" id="miniAnimation">STORE LOCATOR</a></li>
                        <li><a href="" className="component" id="miniAnimation">Privacy Policy</a></li>
                        <li><a href="" className="component" id="miniAnimation">Your Privacy Choices</a></li>
                        <li><a href="" className="component" id="miniAnimation">UK Modern Slavery Act</a></li>
                        <li><a href="" className="component" id="miniAnimation">California Transparency Act</a></li>


                    </ul>
                </ul>

                <ul className="container">
                    <a href="https://twitter.com/lululemon"><img
                        src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-3/512/twitter-icon.png"
                        alt=""/></a>
                    <a href="https://pinterest.com/lululemon"><img
                        src="https://images.vexels.com/media/users/3/131766/isolated/preview/94f495f92a4b9aa1e7714db80856358e-pinterest-flat-icon.png"
                        alt=""/></a>
                    <a href="https://www.youtube.com/user/lululemon"><img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/YouTube_play_buttom_dark_icon_%282013-2017%29.svg/1200px-YouTube_play_buttom_dark_icon_%282013-2017%29.svg.png"
                        alt=""/></a>
                    <a href="https://facebook.com/lululemon"><img
                        src="https://i.pinimg.com/736x/d5/f1/6a/d5f16a0164862cf8270a71136d0cc50d.jpg" alt=""/></a>
                    <a href="https://instagram.com/lululemon"><img
                        src="https://media.discordapp.net/attachments/853703320711462973/1250970914225393724/grQQPA3N0SGAAIIIIAAAggggAACCCCAgDcCNBC8SQWBIIAAAggggAACCCCAAAIIIOCvwH8BxKqau43WAP4AAAAASUVORK5CYII.png?ex=666ce0f3&is=666b8f73&hm=071d1c7404a848a1f7d1f5d3f20a57506215c9f52702f9f607b7bea003096c82&=&format=webp&quality=lossless&width=1574&height=1108"
                        alt=""/></a>
                </ul>
            </div>

            <hr/>

            <div className="legalMenu">

                <div className="left">
                    © lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7
                </div>

                <div className="right">

                    <a id="miniAnimation" href="https://info.lululemon.com/legal/privacy-policy">Privacy Policy</a>
                    <div className="vl"></div>
                    <a id="miniAnimation" href="https://info.lululemon.com/legal/terms-of-use">Terms of Use</a>
                </div>


            </div>
        </div>

    </>);
};

export default Footer;

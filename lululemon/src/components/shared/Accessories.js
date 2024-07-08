import "./Accessories.css"
import {useState} from "react";

const Accessories = () => {
    return (
        <>
            <div className="accessoriesContainer">
                <div className="accessoriesContainerTop">
                    <div className="accessoriesContainerIndividual">
                        <ul className="accessoriesList">
                            <li><a href="" id="miniAnimation">What's New</a></li>
                            <li><a href="" id="miniAnimation">Bestsellers</a></li>
                            <li><a href="" id="miniAnimation">Gifting Quiz</a></li>
                            <li><a href="" id="miniAnimation">Mini Bags</a></li>
                            <li><a href="" id="miniAnimation">Running Accessories</a></li>
                            <li><a href="" id="miniAnimation">Pink Accessories</a></li>
                            <li><a href="" id="miniAnimation">Everywhere Bag Shop</a></li>
                            <li><a href="" id="miniAnimation">Travel Accessories</a></li>
                            <li><a href="" id="miniAnimation">Summer Accessories</a></li>
                            <li><a href="" id="miniAnimation">We Made Too Much</a></li>
                        </ul>
                    </div>

                    <div className="accessoriesContainerIndividual">
                        <div className="accessoriesContainerTitle">
                            <p>ACCESSORIES</p>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN06qu2Rl_j-QmWkhOCshnJmYXr3KODojgw&s"
                                alt=""/>
                        </div>
                        <ul className="accessoriesList">
                            <li><a href="" id="miniAnimation">Bags</a></li>
                            <li><a href="" id="miniAnimation">Bucket Hats</a></li>
                            <li><a href="" id="miniAnimation">Caps</a></li>
                            <li><a href="" id="miniAnimation">Equipment</a></li>
                            <li><a href="" id="miniAnimation">Gloves & Mittens</a></li>
                            <li><a href="" id="miniAnimation">Hair Accessories</a></li>
                            <li><a href="" id="miniAnimation">Hats</a></li>
                        </ul>
                    </div>

                    <div className="accessoriesContainerIndividual">
                        <div className="accessoriesContainerTitle">
                            <p>BAGS</p>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN06qu2Rl_j-QmWkhOCshnJmYXr3KODojgw&s"
                                alt=""/>
                        </div>
                        <ul className="accessoriesList">
                            <li><a href="" id="miniAnimation">Backpacks</a></li>
                            <li><a href="" id="miniAnimation">Belt Bags</a></li>
                            <li><a href="" id="miniAnimation">Crossbody Bags</a></li>
                            <li><a href="" id="miniAnimation">Duffle Bags</a></li>
                            <li><a href="" id="miniAnimation">Totes</a></li>
                            <li><a href="" id="miniAnimation">Wallets & Pouches</a></li>
                        </ul>
                    </div>

                    <div className="accessoriesContainerImage">
                        <a href="">
                            <img
                                src="https://images.lululemon.com/is/image/lululemon/na_may24_wk4_BagsBreadth_MegaNavPromo_Bags?$promoBlock$&wid=768&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                                alt=""/>
                            <h2>Top of your game.</h2>
                            <p>The new ShowZero™ Polo hides signs of sweat, so you can look as good as you play.</p>
                            <div className="accessoriesContainerTitle">
                                <p>Shop Golf</p>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN06qu2Rl_j-QmWkhOCshnJmYXr3KODojgw&s"
                                    alt=""/>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="accessoriesContainerBottom">
                    <div className="accessoriesContainerBottomLeft">
                        <p>ACTIVITY</p>
                        <ul className="accessoriesListBottom">
                            <li><a href="" id="miniAnimation">Yoga</a></li>
                            <li><a href="" id="miniAnimation">Running</a></li>
                            <li><a href="" id="miniAnimation">Workout</a></li>
                            <li><a href="" id="miniAnimation">Casual</a></li>
                            <li><a href="" id="miniAnimation">Travel</a></li>
                            <li><a href="" id="miniAnimation">Tennis</a></li>
                        </ul>
                    </div>
                    <div className="accessoriesContainerBottomRight">
                        <div className="accessoriesContainerTitle">
                            <p>SHOP ALL MEN</p>
                            <img
                                src="https://media.discordapp.net/attachments/853703320711462973/1251035798258581615/wEh2fQzOMe7oAAAAABJRU5ErkJggg.png?ex=666d1d61&is=666bcbe1&hm=ee03720f4d9eaa2bad003b0fc97a7a705cd4b8d06ca8105f42ee8a5e8a49f4f0&=&format=webp&quality=lossless&width=900&height=900"
                                alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Accessories;

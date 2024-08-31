import "./Shoes.css"
import {useState} from "react";

const Shoes = () => {
    return (
        <>
            <div className="shoesContainer">
                <div className="shoesContainerTop">
                    <div className="shoesContainerIndividual">
                        <ul className="shoesList">
                            <li><a href="" id="miniAnimation">Women's Shoes</a></li>
                            <li><a href="" id="miniAnimation">Men's Shoes</a></li>
                        </ul>
                    </div>

                    <div className="shoesContainerIndividual">
                        <div className="shoesContainerTitle">
                            <p>SHOE TYPES</p>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN06qu2Rl_j-QmWkhOCshnJmYXr3KODojgw&s"
                                alt=""
                            />
                        </div>
                        <ul className="shoesList">
                            <li><a href="" id="miniAnimation">Cross Training Shoes</a></li>
                            <li><a href="" id="miniAnimation">Running Shoes</a></li>
                            <li><a href="" id="miniAnimation">Slides</a></li>
                            <li><a href="" id="miniAnimation">Sneakers</a></li>
                            <li><a href="" id="miniAnimation">Trail Running Shoes</a></li>
                            <li><a href="" id="miniAnimation">Workout Shoes</a></li>
                        </ul>
                    </div>

                    <div className="shoesContainerIndividual">
                        <div className="shoesContainerTitle">
                            <p>ACTIVITY</p>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN06qu2Rl_j-QmWkhOCshnJmYXr3KODojgw&s"
                                alt=""
                            />
                        </div>
                        <ul className="shoesList">
                            <li><a href="" id="miniAnimation">Running</a></li>
                            <li><a href="" id="miniAnimation">Workout</a></li>
                            <li><a href="" id="miniAnimation">Casual</a></li>
                            <li><a href="" id="miniAnimation">Hiking</a></li>
                        </ul>
                    </div>

                    <div className="shoesContainerImage">
                        <a href="">
                            <img
                                src="https://images.lululemon.com/is/image/lululemon/na_Jun24_wk3_M_OTM_MegaNavPromo_Shoes?$promoBlock$&wid=768&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                                alt=""
                            />
                            <h2>Top of your game.</h2>
                            <p>The new ShowZero™ Polo hides signs of sweat, so you can look as good as you play.</p>
                            <div className="shoesContainerTitle">
                                <p>Shop Golf</p>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN06qu2Rl_j-QmWkhOCshnJmYXr3KODojgw&s"
                                    alt=""
                                />
                            </div>
                        </a>
                    </div>
                </div>

                <div className="shoesContainerBottom">
                    <div className="shoesContainerBottomLeft">
                        <p>ACTIVITY</p>
                        <ul className="shoesListBottom">
                            <li><a href="" id="miniAnimation">Running</a></li>
                            <li><a href="" id="miniAnimation">Workout</a></li>
                            <li><a href="" id="miniAnimation">Casual</a></li>
                            <li><a href="" id="miniAnimation">Hiking</a></li>
                        </ul>
                    </div>
                    <div className="shoesContainerBottomRight">
                        <div className="shoesContainerTitle">
                            <p>SHOP ALL MEN</p>
                            <img
                                src="https://media.discordapp.net/attachments/853703320711462973/1251035798258581615/wEh2fQzOMe7oAAAAABJRU5ErkJggg.png?ex=666d1d61&is=666bcbe1&hm=ee03720f4d9eaa2bad003b0fc97a7a705cd4b8d06ca8105f42ee8a5e8a49f4f0&=&format=webp&quality=lossless&width=900&height=900"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shoes;

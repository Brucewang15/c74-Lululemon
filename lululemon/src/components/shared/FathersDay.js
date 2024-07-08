import "./FathersDay.css";
import {useState} from "react";

const FathersDay = () => {
    return (
        <>
            <div className="fathersDayContainer">
                <div className="fathersDayContainerTop">
                    <div className="fathersDayContainerIndividual">
                        <ul className="fathersDayList">
                            <li><a href="" id="miniAnimation">Women's</a></li>
                            <li><a href="" id="miniAnimation">Men's</a></li>
                            <li><a href="" id="miniAnimation">Accessories</a></li>
                            <li><a href="" id="miniAnimation">Discover Team Canada</a></li>
                        </ul>
                    </div>
                </div>

                <div className="fathersDayContainerBottom">
                    <div className="fathersDayContainerBottomRight">
                        <div className="fathersDayContainerTitle">
                            <p>TEAM CANADA</p>
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

export default FathersDay;

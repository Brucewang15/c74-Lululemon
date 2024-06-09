// header component

import "./Header.css"

export const Header = () => {

    return <>

        <div className="topHeaderNavigation">
            <div className="storeLocator"></div>
            <div className="giftCards"></div>
            <div className="getHelp"></div>
            <div className="CAN"></div>
        </div>

        <div className="headerNavigation">

            <div className="headerLeft">

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
                    alt="lululemonLogo"/>
                <a href="">WOMEN</a>
                <a href="">MEN</a>
                <a href="">ACCESSORIES</a>
                <a href="">SHOES</a>
                <a href="">FATHER'S DAY</a>


            </div>

            <div className="headerRight">
                <div className="input">
                    <button className="search"></button>
                    <input type="text" placeholder = "Search"/>
                </div>
                <a href="">
                    <img src="" alt=""/>
                    <p>Sign In</p>
                </a>
                <a href="">

                </a>
            </div>
        </div>



    </>
}


import "./WelcomePage.css"

import {useDispatch, useSelector} from "react-redux";
import { setHelpActivity } from "../../redux/actions/helpAction";

const WelcomePage = () => {
    const dispatch = useDispatch()

    const onOpenPhoto = () => {
        dispatch(setHelpActivity("Photo"));
    };

    const onOpenChat = () => {
        dispatch(setHelpActivity("Chat"));
    };

    
    return <div className="welcomePage">
        <div className="welcomePageContainer">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
            alt="lululemonLogo" className="lululemonWelcomeLogo"
            />
            <h1>
                How can we help?
            </h1>
            <div className="description">
                Get support from our Virtual Assistant 24/7 <br/> 
                Our Educators are available to help: <br/>
                Mon – Fri, 5am – 9pm PT <br/>
                Sat – Sun, 6am – 6pm PT
            </div>
            <div className="border"/>
            <div className="warning">
                By continuing, you agree to and acknowledge that this chat is used <br/> for quality and training purposes as per lululemon's Terms of Use and <br/> Privacy Policy.
            </div>
            <div className="buttonsContainer">
                <button onClick={onOpenPhoto} className="button photoButton">
                    Image Search
                </button>
                <button onClick={onOpenChat} className="button chatButton">
                    Live Chat
                </button>
            </div>
        </div>
    </div>
}


export default WelcomePage
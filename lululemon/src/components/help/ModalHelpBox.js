import "./ModalHelpBox.css"

import chat_icon from "../../assets/chat.png";
import arrow_down_icon from "../../assets/arrow_down.png";
import cross_icon from "../../assets/cross.png";

import {useDispatch, useSelector} from "react-redux";
import { setHelpActivity, setHelpOpen } from "../../redux/actions/helpAction";
import WelcomePage from "./WelcomePage";

const ModalHelpBox = () => {
    const dispatch = useDispatch()

    const isHelpOpen = useSelector(
        (state) => state.helpReducer.isHelpOpen,
    );

    console.log(isHelpOpen)

    const onHide = () => {
        dispatch(setHelpOpen(false));
    };

    const onOpen = () => {
        dispatch(setHelpOpen(true));
    };

    const onClose = () => {
        dispatch(setHelpOpen(false));
        dispatch(setHelpActivity(""));
    };

    
    return <div className="modalHelpBox">
    <div className="modalContainer">
        {!isHelpOpen && 
            <button onClick={onOpen} className="helpButton">
                <img className="helpIcon" src={chat_icon} alt=""/>
            </button>
        }
        {isHelpOpen && 
            <div className="helpBox">
                <div className="helpBoxNavBar">
                    <div className="helpBoxNavBarCell">
                    </div>
                    <div className="helpBoxNavBarCell alignRight">
                        <button onClick={onHide} className="topbarButton">
                            <img className="topbarIcon" src={arrow_down_icon} alt=""/>
                        </button>
                        <button onClick={onClose} className="topbarButton">
                            <img className="topbarIcon" src={cross_icon} alt=""/>
                        </button>
                    </div>
                </div>

                <WelcomePage/>
            </div>
        }
    </div>
    </div>
}


export default ModalHelpBox
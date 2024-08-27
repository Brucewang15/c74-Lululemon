import "./ModalHelpBox.css"

import chat_icon from "../../assets/chat.png";
import arrow_down_icon from "../../assets/arrow_down.png";
import cross_icon from "../../assets/cross.png";

import {useDispatch, useSelector} from "react-redux";
import { setHelpActivity, setHelpOpen } from "../../redux/actions/helpAction";
import WelcomePage from "./WelcomePage";
import ImageSearch from "./ImageSearch";
import {useEffect, useState} from "react";
import TextSearch from "./TextSearch";

const   ModalHelpBox = () => {
    const dispatch = useDispatch()

    const isHelpOpen = useSelector(
        (state) => state.helpReducer.isHelpOpen,
    );

    const lastActivity = useSelector(
        (state) => state.helpReducer.lastActivity,
    );
    const [currentPageName, setCurrentPageName] = useState("Help");
    const [chatInput, setChatInput] = useState("");


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

    // var currentPageName = "Help"
    // if (lastActivity == "Photo"){
    //     currentPageName = "Image Search"
    // }
    useEffect(() => {
        if (lastActivity === "Photo") {
            setCurrentPageName("Image Search");
        } else if (lastActivity === "Chat") {
            setCurrentPageName("Text Search");
        }
    }, [lastActivity]);


    return <div className="modalHelpBox">
        <div className="modalContainer">
            {!isHelpOpen &&
                <button onClick={onOpen} className="helpButton">
                    <img className="helpIcon" src={chat_icon} alt=""/>
                </button>
            }
            {isHelpOpen &&
                <div className="helpBoxAI">
                    <div className="helpBoxNavBar">
                        <div className="helpBoxNavBarCell">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
                                alt="lululemonLogo" className="lululemonHelpBoxLogo"
                            />
                            <div className="helpBoxNavBarTitle">
                                {currentPageName}
                            </div>
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
                    <div className="helpBoxGradient">
                    </div>

                    {/* Rendering components based on lastActivity */}
                    {lastActivity === "Photo" && <ImageSearch />}
                    {lastActivity === "Chat" && <TextSearch />}
                    {(!lastActivity || lastActivity === "Help") && <WelcomePage />}

                </div>
            }
        </div>
    </div>
}


export default ModalHelpBox
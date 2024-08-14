import "./WelcomePage.css"

import {useDispatch, useSelector} from "react-redux";
import { setHelpActivity } from "../../redux/actions/helpAction";

const WelcomePage = () => {
    const dispatch = useDispatch()

    const lastActivity = useSelector(
        (state) => state.helpReducer.lastActivity,
    );

    const onOpenPhoto = () => {
        dispatch(setHelpActivity("Photo"));
    };

    const onOpenChat = () => {
        dispatch(setHelpActivity("Chat"));
    };

    
    return <div className="welcomePage">
        <button onClick={onOpenPhoto} className="button photoButton">
            Image Search
        </button>
        <button onClick={onOpenChat} className="button chatButton">
            Live Chat
        </button>
    </div>
}


export default WelcomePage
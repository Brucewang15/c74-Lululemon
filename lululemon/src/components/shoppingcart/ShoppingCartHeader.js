import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import './ShoppingCartHeader.scss'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const ShoppingCartHeader = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.authReducer.user)
    const isLogin = useSelector(state => state.authReducer.loginStatus)
    return (
        <div className='shoppingCartHeader'>
            <img onClick={() => navigate('/')}
                 src='https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg'
                 alt="logo"/>
            <div className='signInContainer'>
                <PermIdentitySharpIcon/> {isLogin === false ? 'Sign in' : `${userInfo.firstName} ${userInfo.lastName}`}
            </div>
        </div>
    )
}
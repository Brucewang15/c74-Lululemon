import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import './ShoppingCartHeader.scss'
import {useNavigate} from "react-router-dom";

export const ShoppingCartHeader = () => {
    const navigate = useNavigate()
    return (
        <div className='shoppingCartHeader' onClick={() => navigate('/')}>
            <img onClick={() => navigate('/')}
                 src='https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg'
                 alt="logo"/>
            <div className='signInContainer'><PermIdentitySharpIcon/> Sign in</div>
        </div>
    )
}
import {useNavigate} from "react-router-dom";
import './EmptyShoppingCart.scss'
import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export const EmptyShoppingCart = () => {
    const navigate = useNavigate()

    return (
        <div className='emptyShoppingCartContainer'>
            <div className='shoppingCartHeader'>
                <img
                    src='https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg'
                    alt="logo"/>
                <div className='signInContainer'><PermIdentitySharpIcon/> Sign in</div>
            </div>

            <div className='emptyShoppingCartBody'>
                <h1>Give your bag some love!</h1>
                <button className='whatsNewBtn' onClick={() => navigate('/')}>SHOP WHAT'S NEW
                </button>
            </div>

            <div className='emptyShoppingCartFooter'>
                <li className='list1'>
                    <ul>Contact Us</ul>
                    <ul>Live Chat</ul>
                    <ul>1.877.263.9300</ul>
                </li>
                <li className='list2'>
                    <ul>Shipping Policy</ul>
                    <ul>Privacy Policy</ul>
                    <ul>Term of Use</ul>
                    <ul>Accessibility Statement</ul>
                    <ul>Your Privacy Choices <VerifiedUserOutlinedIcon className='icon'/></ul>
                    <ul>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</ul>
                </li>
            </div>
        </div>
    )
}
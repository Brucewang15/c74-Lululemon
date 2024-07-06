import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import './ShoppingCartHeader.scss'
import {Link} from 'react-router-dom';

export const ShoppingCartHeader = () => {

    return (
        <div className='shoppingCartHeader'>
            <img
                src='https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg'
                alt="logo"/>
            <div className='signInContainer'><PermIdentitySharpIcon/>
                <Link to='/account/login'>
                    Sign in
                </Link>
            </div>
        </div>
    )
}
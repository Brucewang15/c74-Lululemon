import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import './ShoppingCartHeader.scss'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {LoginModal} from "../checkout/LoginModal";

export const ShoppingCartHeader = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.authReducer.user)
    const isLogin = useSelector(state => state.authReducer.loginStatus)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    
    const handleOpenLoginModal = () => {
        setIsModalOpen(true)
    }
    const handleCLoseLoginModal = () => {
        setIsModalOpen(false)
    }
    return (
        <div className='shoppingCartHeader'>
            <img onClick={() => navigate('/')}
                 src='https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg'
                 alt="logo"/>
            <div className='signInContainer' onClick={() => {
                if (isLogin === false)
                    handleOpenLoginModal()
            }}>
                <PermIdentitySharpIcon/> {isLogin === false ? 'Sign in' : `${userInfo.firstName} ${userInfo.lastName}`}
            </div>
            {isModalOpen && <LoginModal handleModalClose={handleCLoseLoginModal} isSuccess={isSuccess}
                                        setIsSuccess={setIsSuccess}/>}
        </div>
    )
}
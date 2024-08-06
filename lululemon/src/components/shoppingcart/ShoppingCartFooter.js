import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import './ShoppingCartFooter.scss'

export const ShoppingCartFooter = () => {


    return (
        <div className='shoppingCartFooter'>
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
    )
}
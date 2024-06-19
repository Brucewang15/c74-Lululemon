import {Link} from "react-router-dom";
import {Header} from "../shared/Header";
import Footer from "../shared/Footer";

export const WrongProductPage = () => {

    return (
        <div>
            <Header/>
            <h1>The Product You Searched Doesn't Exist</h1>
            <Link to={'/'} style={{backgroundColor: 'lightblue'}}> Go back to Whats New</Link>
            <Footer/>
        </div>
    )
}
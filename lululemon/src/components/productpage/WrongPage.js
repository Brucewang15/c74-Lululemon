import {Link} from "react-router-dom";
import {Header} from "../shared/Header";
import Footer from "../shared/Footer";

export const WrongPage = () => {

    return (
        <div>
            <Header/>
            <h1>this is a wrong page</h1>
            <Link to={'/'} style={{backgroundColor: 'lightblue'}}> Go back to Whats New</Link>
            <Footer/>
        </div>
    )
}
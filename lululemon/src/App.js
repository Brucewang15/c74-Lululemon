import './App.css';
import {WhatsNewPage} from "./pages/WhatsNewPage";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ProductPage} from "./components/productpage/ProductPage";
import {WrongPage} from './components/productpage/WrongPage'
import {WrongProductPage} from "./components/productpage/WrongProductPage";
import {ShoppingCart} from "./components/shoppingcart/ShoppingCart";
import Login from "./components/login/Login";

function App() {
    return (
        <div className="App">
            <Login/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<WhatsNewPage/>}/>
                    <Route path='/product/:productID' element={<ProductPage/>}/>
                    <Route path='/wrong-product' element={<WrongProductPage/>}/>
                    <Route path='/shop/mybag' element={<ShoppingCart/>}/>
                    <Route path='*' element={<WrongPage/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

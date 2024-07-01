import './App.css';
import {WhatsNewPage} from "./pages/WhatsNewPage";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ProductPage} from "./pages/ProductPage";
import {WrongPage} from './components/productpage/WrongPage'
import {WrongProductPage} from "./components/productpage/WrongProductPage";
import {ShoppingCart} from "./pages/ShoppingCart";
import {Checkout} from "./components/checkout/Checkout";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<WhatsNewPage/>}/>
                    <Route path='/product/:productID' element={<ProductPage/>}/>
                    <Route path='/wrong-product' element={<WrongProductPage/>}/>
                    <Route path='/shop/mybag' element={<ShoppingCart/>}/>
                    <Route path='/shop/checkout' element={<Checkout/>}/>
                    <Route path='*' element={<WrongPage/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

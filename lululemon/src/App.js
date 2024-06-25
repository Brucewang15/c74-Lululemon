import './App.css';
import {WhatsNewPage} from "./pages/WhatsNewPage";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ProductPage} from "./components/productpage/ProductPage";
import {WrongPage} from './components/productpage/WrongPage'
import {WrongProductPage} from "./components/productpage/WrongProductPage";
import OrderSummary from "./components/mybag/OrderSummary";

function App() {
    return (
        <div className="App">
            <OrderSummary/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<WhatsNewPage/>}/>
                    <Route path='/product/:productID' element={<ProductPage/>}/>

                    <Route path='/wrong-product' element={<WrongProductPage/>}/>
                    <Route path='*' element={<WrongPage/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

import "./ShoppingCartWithItems.scss";
import { ShoppingCartHeader } from "./ShoppingCartHeader";
import { ShoppingCartFooter } from "./ShoppingCartFooter";
import { ShoppingCartProduct } from "./ShoppingCartProduct";

export const ShoppingCartWithItems = () => {
  return (
    <div className="shoppingCartContainer">
      <ShoppingCartHeader />
      <ShoppingCartProduct />
      <ShoppingCartFooter />
    </div>
  );
};

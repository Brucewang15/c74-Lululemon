import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ProductCard from './ProductCard';
import './WhatsNewMain.css';
import {fetchSortedProducts} from "../../redux/actions/filterAction";

const WhatsNewMain = () => {
    //const products = useSelector(state => state.filterReducer.products) || [];
    const dispatch = useDispatch();
    const products = useSelector(state => state.filterReducer.products) || [];
    const filters = useSelector(state => state.filterReducer.filters);
    const sortingOption = useSelector(state => state.filterReducer.sortingOption);

    useEffect(() => {
        dispatch(fetchSortedProducts(sortingOption, filters));
    }, [dispatch, sortingOption, filters]);

    return (
        <div>
            {/*<div className="whatsNewContainer">*/}
                <div className="productsGrid">
                    {products.map((product, index) => (
                        <ProductCard key={`${product.productId}-${index}`} product={product} />
                    ))}
                </div>
            {/*</div>*/}
        </div>
    );
};

export default WhatsNewMain;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import './WhatsNewMain.css';
import {fetchMoreProducts, fetchSortedProducts} from "../../redux/actions/filterAction";

const WhatsNewMain = () => {
    //const products = useSelector(state => state.filterReducer.products) || [];
    const dispatch = useDispatch();
    const products = useSelector(state => state.filterReducer.products) || [];
    const filters = useSelector(state => state.filterReducer.filters);
    const sortingOption = useSelector(state => state.filterReducer.sortingOption);
    const currentPage = useSelector(state => state.filterReducer.currentPage);
    const pageParams = useSelector(state => state.filterReducer.pageParams);
    const totalProducts = pageParams.totalProducts || 0;
    console.log(pageParams)
    const handleLoadMore = () => {
        dispatch(fetchMoreProducts());
    };

    // useEffect(() => {
    //     dispatch(fetchSortedProducts(sortingOption, filters));
    // }, [dispatch, sortingOption, filters]);
    //
    return (
        <div>
            {/*<div className="whatsNewContainer">*/}
                <div className="productsGrid">
                    {products.map((product, index) => (
                        <ProductCard key={`${product.productId}-${index}`} product={product} />
                    ))}
                </div>
                {products.length < totalProducts && (
                    <div className="loadMoreContainer">
                        <p>Viewing {products.length} of {totalProducts}</p>
                        <button onClick={handleLoadMore}>View More Products</button>
                    </div>
                )}
            {/*</div>*/}
        </div>
    );
};

export default WhatsNewMain;
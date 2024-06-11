// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";
import ProductCard from "../components/whatsnew/ProductCard";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";

export const WhatsNewPage = () => {
    const products = useSelector(state => state.productReducer.products) || []
    const filters = useSelector(state => state.filterReducer.filters)


    return <>
        <h1>This is new page</h1>
        {/* 把我们整个API fetch filter 的数据可以打印出来测试*/}
        {/*{JSON.stringify(filters)}*/}


        <CheckedFilters/>
        <FilterContainer/>
        <div>Products go here</div>
    </>
}
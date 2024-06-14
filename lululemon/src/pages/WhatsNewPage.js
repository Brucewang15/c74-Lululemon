// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";
import ProductCard from "../components/whatsnew/ProductCard";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";
import {FeatureTabs} from "../components/whatsnew/FeatureTabs";
import {FeatureImages} from "../components/whatsnew/FeatureImages";
import {FeatureSection} from "../components/whatsnew/FeatureSection";

export const WhatsNewPage = () => {
    const products = useSelector(state => state.productReducer.products) || []
    const filters = useSelector(state => state.filterReducer.filters)


    return <>
        <h1>This is new page</h1>
        {/* 把我们整个API fetch filter 的数据可以打印出来测试*/}
        {/*{JSON.stringify(filters)}*/}


        {/*{JSON.stringify(products)}*/}


        {/*Render selected filters name*/}
        {/*<div style={{display: "flex", justifyContent: "center", gap: "20px"}}>*/}
        {/*    {checkedFilters.length > 0 ? checkedFilters.map((filter, index) => {*/}
        {/*        return filter.name ?*/}
        {/*            <div style={{fontSize: "large", fontWeight: "600"}} key={index}>{filter.name} </div>*/}
        {/*            :*/}
        {/*            <div style={{fontSize: "large", fontWeight: "600"}} key={index}>{filter.alt} </div>*/}
        {/*    }) : <p style={{fontSize: "large", fontWeight: "600", color: "red"}}>Choose a filter to see more items</p>}*/}
        {/*</div>*/}


        <FeatureSection/>
        <CheckedFilters/>
        <FilterContainer/>
        <div>Products go here</div>
    </>
}
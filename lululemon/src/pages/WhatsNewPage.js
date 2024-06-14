// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";
import ProductCard from "../components/whatsnew/ProductCard";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";
import {FeatureTabs} from "../components/whatsnew/FeatureTabs";
import {FeatureImages} from "../components/whatsnew/FeatureImages";
import {FeatureSection} from "../components/whatsnew/FeatureSection";

import WhatsNewMain from "../components/whatsnew/WhatsNewMain";
import './whatsNewPage.css';

export const WhatsNewPage = () => {
    //const products = useSelector(state => state.productReducer.products) || []
    //const filters = useSelector(state => state.filterReducer.filters)


    return (
        <>
            <div className='whatsNewPageLayout'>
                <FilterContainer/>
                <div className='whatsNewContainer'>
                    <WhatsNewMain/>
                    <FeatureSection/>
                    <CheckedFilters/>
                </div>

            </div>


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

            <div>Products go here</div>
        </>
    );

}
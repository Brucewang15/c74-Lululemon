// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";
import ProductCard from "../components/whatsnew/ProductCard";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";
import {FeatureTabs} from "../components/whatsnew/FeatureTabs";
import {FeatureImages} from "../components/whatsnew/FeatureImages";
import {FeatureSection} from "../components/whatsnew/FeatureSection";
import {SortBar} from '../components/whatsnew/SortBar'

import WhatsNewMain from "../components/whatsnew/WhatsNewMain";
import './whatsNewPage.css';
import {Header} from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export const WhatsNewPage = () => {
    //const products = useSelector(state => state.productReducer.products) || []
    //const filters = useSelector(state => state.filterReducer.filters)


    return (
        <>
            <div className='whatsNewWrapper'>
                <Header/>
                <div className='whatsNewPageLayout'>
                    <FilterContainer/>
                    <div className='whatsNewContainer'>
                        <FeatureSection/>
                        <SortBar/>
                        <CheckedFilters/>
                        <WhatsNewMain/>

                    </div>

                </div>
            </div>
            <Footer/>
        </>

    );

}
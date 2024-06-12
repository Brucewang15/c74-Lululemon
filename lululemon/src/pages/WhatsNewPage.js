// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";
import ProductCard from "../components/whatsnew/ProductCard";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";
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
                </div>

            </div>

        </>
    );
}
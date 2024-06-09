// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";

export const WhatsNewPage = () => {
    const filterName = useSelector(state => state.filterReducer.filters)
    return <>
        <h1>{filterName.isChecked}</h1>

        {/*  testing to see if components can be rendered*/}
        <FilterContainer/>
    </>
}
// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";

export const WhatsNewPage = () => {
    const filters = useSelector(state => state.filterReducer.filters)

    // Set selected filter's name
    const checkedFilters = Object.keys(filters).flatMap(filterType => filters[filterType].filter(filter => filter.isChecked))

    return <>
        <h1>This is new page</h1>
        {/* 把我们整个API fetch的数据可以打印出来测试*/}
        {JSON.stringify(filters)}


        {/*Render selected filters name*/}
        <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
            {checkedFilters.length > 0 ? checkedFilters.map((filter, index) => {
                return filter.name ?
                    <div style={{fontSize: "large", fontWeight: "600"}} key={index}>{filter.name} </div>
                    :
                    <img key={index} src={filter.swatch}
                         alt={filter.alt}/>
            }) : <p style={{fontSize: "large", fontWeight: "600", color: "red"}}>Choose a filter to see more items</p>}
        </div>


        <FilterContainer/>
    </>
}
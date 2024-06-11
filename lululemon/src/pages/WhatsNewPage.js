// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";

export const WhatsNewPage = () => {
    const filters = useSelector(state => state.filterReducer.filters)
    const products = useSelector(state => state.productReducer.products)

    // Find all the filters are checked
    const checkedFilters = Object.keys(filters).flatMap(filterType => filters[filterType].filter(filter => filter.isChecked))

    return <>
        <h1>This is new page</h1>
        {/* 把我们整个API fetch filter 的数据可以打印出来测试*/}
        {/*{JSON.stringify(filters)}*/}

        {/*{JSON.stringify(products)}*/}


        {/*Render selected filters name*/}
        <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
            {checkedFilters.length > 0 ? checkedFilters.map((filter, index) => {
                return filter.name ?
                    <div style={{fontSize: "large", fontWeight: "600"}} key={index}>{filter.name} </div>
                    :
                    <div style={{fontSize: "large", fontWeight: "600"}} key={index}>{filter.alt} </div>
            }) : <p style={{fontSize: "large", fontWeight: "600", color: "red"}}>Choose a filter to see more items</p>}
        </div>


        <FilterContainer/>
    </>
}
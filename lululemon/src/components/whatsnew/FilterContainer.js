import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterApi} from "../../redux/actions/filterAction";
import {GenderFilter} from "./GenderFilter";
import {CategoryFilter} from "./CategoryFilter";
import {CheckboxFilter} from "./CheckboxFilter";

const FilterContainer = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer.filters)

    // To fetch all the filters when the page is loaded
    useEffect(() => {
        dispatch(fetchFilterApi())
    }, [dispatch]);
    return (
        <div>
            {/*//All the filters components*/}
            {/*<GenderFilter filters={filters}/>*/}
            {/*<CategoryFilter filters={filters}/>*/}
            {Object.keys(filters).map(filterType => {
                return <CheckboxFilter key={filterType} filterType={filterType} filters={filters}/>
            })}
        </div>
    )
}


export default FilterContainer
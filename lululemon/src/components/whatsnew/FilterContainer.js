import {GenderFilter} from "./GenderFilter";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterApi} from "../../redux/actions/filterAction";

const FilterContainer = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer.filters)
    useEffect(() => {
        dispatch(fetchFilterApi())
    }, [dispatch]);
    return (
        <div>
            {/*//All the filters components*/}
            <GenderFilter/>
        </div>
    )
}


export default FilterContainer
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterApi} from "../../redux/actions/filterAction";

import {CheckboxFilter} from "./CheckboxFilter";
import {ColorFilter} from "./ColorFilter";
import {SizeButtonFilter} from "./SizeButtonFilter";
import {postFilterRequest} from "../../redux/actions/productActions";

const FilterContainer = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer.filters)
    const requestBody = useSelector(state => state.filterReducer.requestBody)
    // To fetch all the filters when the page is loaded
    useEffect(() => {
        dispatch(fetchFilterApi())
        dispatch(postFilterRequest())
    }, [dispatch]);

    // To post data to server with updated filters
    useEffect(() => {
        // if (Object.keys(requestBody).length > 0) {
        console.log('sending reqeuest Body', requestBody)
        dispatch(postFilterRequest(requestBody))
        // }
    }, [requestBody, dispatch]);
    return (
        <div>
            {/*//All the filters components*/}

            {/*All the filters except Color and Size, because they are two separate filters*/}
            {Object.keys(filters).map(filterType => {

                if (filterType === 'Colour')
                    return <ColorFilter key={filterType}
                                        filterType={filterType}
                                        filters={filters}/>
                else if (filterType === 'Size')
                    return <SizeButtonFilter
                        key={filterType}
                        filters={filters}
                        filterType={filterType}
                    />
                else
                    return <CheckboxFilter key={filterType}
                                           filterType={filterType}
                                           filters={filters}/>
            })}

        </div>
    )
}


export default FilterContainer
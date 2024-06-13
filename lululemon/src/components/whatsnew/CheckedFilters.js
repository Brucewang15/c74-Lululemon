import {useDispatch, useSelector} from "react-redux";
import {fetchFilterApi, handleRemoveFilter} from "../../redux/actions/filterAction";
import './CheckedFilters.scss'

export const CheckedFilters = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer.filters)
    const checkedFilters = Object.keys(filters).flatMap(filterType => filters[filterType].filter(filter => filter.isChecked))


    return (
        <div className='checkedFiltersWrapper'>
            {checkedFilters.length > 0 && <div className='clearFilter'
                                               onClick={() => dispatch(fetchFilterApi())}
            >Clear All Filters X</div>}
            <div className='checkedFiltersContainer'>

                {checkedFilters.length > 0 ? checkedFilters.map((filter, index) => {
                        const filterType = Object.keys(filters).find(type => filters[type].some(f => f.id === filter.id)
                        );
                        return (
                            <div className='checkedFilter' key={index}
                                 onClick={() => dispatch(handleRemoveFilter(filterType, filter.id))}>
                                {filter.name || filter.alt} ×
                            </div>
                        )
                    })
                    : <div className='unselectedFilters'></div>}
            </div>
        </div>
    )
}
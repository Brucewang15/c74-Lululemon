// this is the filter for Color picker

import {useDispatch, useSelector} from "react-redux";
import {expandFilter, setFilter} from "../../redux/actions/filterAction";
import './ColorFilter.scss'

export const ColorFilter = ({filters, filterType}) => {
    const dispatch = useDispatch()
    const filterExpand = useSelector(state => state.filterReducer.filterExpand)
    const handleFilterChange = (filter) => {
        dispatch(setFilter(filterType, filter))
    }
    // 检测filters数组是不是有值，并且不是空
    if (!filters[filterType] || filters[filterType].length === 0) {
        return null
    }
    return (

        <div className='colorFilter'>
            <div className='colorFilterType'>
                <div className={filterExpand[filterType] ? 'colorFilterTypeNameBold' : 'colorFilterTypeName'}>{filterType}</div>
                <div className='colorFilterToggle' key={filterType} onClick={() => {
                    dispatch(expandFilter(filterType))
                }}>
                    {filterExpand[filterType] ? '-' : '+'}
                </div>
            </div>
            <div className='colorFilterContainer'>
                {filters[filterType] && filters[filterType].map((filter, index) => (
                    filterExpand[filterType]
                    && <div
                        className='colorFilterContainerItem'
                        key={filter.id || `${filter.name}-${index}`}
                        style={{
                            gap: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleFilterChange(filter)}
                    >
                        <img src={filter.swatch}
                             alt={filter.alt}
                             key={filter.id || `${filter.name}-${index}`}
                             style={{
                                 width: '24px',
                                 height: '24px',
                                 borderRadius: "50%",
                                 cursor: "pointer",
                                 border: filter.isChecked ? "red 2px solid" : "grey 1px solid"
                             }}
                        />
                        <p>{filter.alt}</p>
                    </div>
                    // <button
                    //     key={filter.id || `${filter.name}-${index}`}
                    //     style={{backgroundColor: filter.swatch, borderRadius: '50%', padding: '10px', margin: '5px'}}
                    //
                    // >
                    //     {filter.alt}
                    // </button>


                ))}
            </div>

        </div>
    )
}
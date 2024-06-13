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

    const isVisible = filterExpand[filterType]

    return (

        <div className='colorFilter'>

            <div className='colorFilterType' onClick={() => {
                dispatch(expandFilter(filterType))
            }}>
                <div className={isVisible ? 'colorFilterTypeNameBold' : 'colorFilterTypeName'}>{filterType}</div>
                <div className='colorFilterToggle' key={filterType}>
                    {isVisible
                        ? <div className='colorFilterToggleHorizontal'>|</div>
                        : <div>
                            <div className='colorFilterToggleStatic'>|</div>
                            <div className='colorFilterToggleVertical'>|</div>
                        </div>}
                </div>
            </div>
            <div className={`colorFilterContainer ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
                {filters[filterType] && filters[filterType].map((filter, index) => (
                    isVisible
                    && <div
                        className='colorFilterContainerItem'
                        key={filter.id || `${filter.name}-${index}`}

                        onClick={() => handleFilterChange(filter)}
                    >
                        <img
                            className={filter.isChecked ? 'colorFilterImgChecked' : 'colorFilterImg'}
                            src={filter.swatch}
                            alt={filter.alt}
                            key={filter.id || `${filter.name}-${index}`}

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
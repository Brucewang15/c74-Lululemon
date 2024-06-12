// This will be the reusable components for checkbox filters


import {useDispatch, useSelector} from "react-redux";
import {expandFilter, setFilter, viewMoreFilter} from "../../redux/actions/filterAction";
import './CheckboxFilter.scss'
import {actionTypes} from "../../redux/actions/actionTypes";

export const CheckboxFilter = ({filterType, filters}) => {
    const dispatch = useDispatch();
    const filterExpand = useSelector(state => state.filterReducer.filterExpand)
    const filterViewMore = useSelector(state => state.filterReducer.filterViewMore)

    const handleFilterChange = (filter) => {
        console.log(`Toggling filter: ${filter.id}`);
        // dispatch(setFilter(filterType, {...filter, isChecked: !filter.isChecked}))  // 在component中处理反选逻辑，但是还是让reducer处理好，详情见filterReducer的，toggleFilter case
        dispatch(setFilter(filterType, filter))
    }

    if (!filters[filterType] || filters[filterType].length === 0) {
        return null
    }


    return (
// <<<<<<< HEAD
//         <div>
//             <div>
//                 <h2>
//                     <span>
//                         <span className='filterTypeContainer'>
//                     {filterType}
//                         </span>
//                     </span>
//                 </h2>
//                 {/*  Render all the filters with a checkbox next to it.  */}
//                 <div className='checkboxContainer'>
//                     {filters[filterType].map((filter, index) => (
//                         <div key={filter.id || index}
//                         >
//                             {/*把onChange直接放在label中instead of input，这样子用户不论点击文字还是checkbox都可以选择*/}
//                             <label htmlFor={filter.id || `${filterType}-${index}`}
//                                    onChange={() => handleFilterChange(filter)}>
//                                 <input type='checkbox'
//                                        checked={filter.isChecked}
//                                        id={filter.id || `${filterType}-${index}`}
//                                        onChange={(e) => {
//                                            {
//                                                handleFilterChange(filter)
//                                            }
//                                            // 在这添加一个stopPropagation是因为防止冒泡（点击了input，结果propagate到label又选择一次。等于没选）
//                                            e.stopPropagation()
//                                        }}
//                                 />
//
//                                 {
//                                     (filter.name || filter.swatch) && (filter.name ? filter.name :
//                                         <img src={filter.swatch} alt={filter.alt}/>)
//                                 }
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//
// =======
        <div className='checkboxFilter'>
            <div className='filterType'>
                <div className={filterExpand[filterType] ? 'filterTypeNameBold' : 'filterTypeName'}>{filterType}</div>
                <div className='filterToggle' key={filterType} onClick={() => {
                    dispatch(expandFilter(filterType))
                }}>
                    {filterExpand[filterType] ? '-' : '+'}
                </div>
            </div>
            {/*  Render all the filters with a checkbox next to it.  */}
            {filters[filterType]
                .slice(0, filterViewMore[filterType] ? filterViewMore[filterType].length : 5)
                .map((filter, index) => (
                filterExpand[filterType]
                && <div className='filterDetailsBox' key={filter.id || index}>
                    {/*把onChange直接放在label中instead of input，这样子用户不论点击文字还是checkbox都可以选择*/}
                    <label htmlFor={filter.id || `${filterType}-${index}`} onChange={() => handleFilterChange(filter)}>
                        <input type='checkbox'
                               checked={filter.isChecked}
                               id={filter.id || `${filterType}-${index}`}
                               onChange={(e) => {
                                   {
                                       handleFilterChange(filter)
                                   }
                                   // 在这添加一个stopPropagation是因为防止冒泡（点击了input，结果propagate到label又选择一次。等于没选）
                                   e.stopPropagation()
                               }}
                        />

                        {
                            (filter.name || filter.swatch) && (filter.name ? filter.name :
                                <img src={filter.swatch} alt={filter.alt}/>)
                        }
                    </label>
                </div>
            ))}

            {filterExpand[filterType]
                && filters[filterType].length > 5
                && <div
                    className='filterViewMore'
                    onClick={() => {
                dispatch(viewMoreFilter(filterType))
            }}>{filterViewMore[filterType] ? 'View Less -' : 'View More +'}</div>}
        </div>
    )
}
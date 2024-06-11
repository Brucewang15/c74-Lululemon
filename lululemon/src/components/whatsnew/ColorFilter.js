// this is the filter for Color picker
import {useDispatch} from "react-redux";
import {setFilter} from "../../redux/actions/filterAction";
import './ColorFilter.scss'

export const ColorFilter = ({filters, filterType}) => {
    const dispatch = useDispatch()
    const handleFilterChange = (filter) => {
        dispatch(setFilter(filterType, filter))
    }
    // 检测filters数组是不是有值，并且不是空
    if (!filters[filterType] || filters[filterType].length === 0) {
        return null
    }
    return (
        <>
            <span>{filterType}</span>
            <div className='imgContainerOutside'>
                {filters[filterType] && filters[filterType].map((filter, index) => (
                    <div className='imgContainer' key={filter.id || `${filter.name}-${index}`}
                         style={{
                             display: "flex",
                             flexDirection: "row",
                             alignItems: "center",
                             justifyContent: "center",
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


                ))

                }
            </div>
        </>
    )
}
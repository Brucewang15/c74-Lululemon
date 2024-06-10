// this is the filter for the size buttons.
import {useDispatch} from "react-redux";
import {setFilter} from "../../redux/actions/filterAction";

export const SizeButtonFilter = ({filters, filterType}) => {
    const dispatch = useDispatch()
    const handleFilterChange = (filter) => {
        dispatch(setFilter(filterType, filter))
    }

    return (
        <>
            <h3>{filterType}</h3>
            {filters[filterType].map((filter, index) => {
                    if (filter.name !== 'sizeDivider')
                        return <button
                            onClick={() => handleFilterChange(filter)}
                            key={filter.id || `${filterType}-${index}`}
                            style={{
                                width: '50px',
                                height: '40px',
                                fontWeight: "600",
                                cursor: "pointer",
                                border: filter.isChecked ? "red 2px solid" : "grey 1px solid"
                            }}
                        >
                            {filter.name}
                        </button>
                    else return <div key={filter.id || `divider-${index}`}> -------------- </div>
                }
            )}
        </>
    )
}
// This will be the reusable components for checkbox filters


import {useDispatch} from "react-redux";
import {setFilter} from "../../redux/actions/filterAction";

export const CheckboxFilter = ({filterType, filters}) => {
    const dispatch = useDispatch();
    const handleFilterChange = (filter) => {
        console.log(`Toggling filter: ${filter.id}`);
        dispatch(setFilter(filterType, {...filter, isChecked: !filter.isChecked}))
    }

    if (!filters[filterType] || filters[filterType].length === 0) {
        return null
    }
    return (
        <>
            <h3>{filterType}</h3>
            {filters[filterType].map((filter, index) => (
                <div key={filter.id || index}>
                    <label htmlFor={filter.id || `${filterType}-${index}`}>
                        <input type='checkbox'
                               checked={filter.isChecked}
                               id={filter.id || `${filterType}-${index}`}
                               onChange={() => handleFilterChange(filter)}
                        />
                    </label>
                    {
                        (filter.name || filter.swatch) && (filter.name ? filter.name :
                            <img src={filter.swatch} alt={filter.alt}/>)
                    }


                </div>


            ))}

        </>

    )
}
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../../redux/actions/filterAction";

export const GenderFilter = ({filters}) => {
    const dispatch = useDispatch()
    const handleFilterChange = (filter) => {
        dispatch(setFilter('Gender', {...filter, isChecked: !filter.isChecked}))
    }
    return (
        <>
            <h3>Gender</h3>

            {filters && filters['Gender'].map(filter => {
                return (
                    <div key={filter.name}>
                        <label htmlFor={filter.name}>
                            <input
                                type='checkbox'
                                checked={filter.isChecked}
                                onChange={() => handleFilterChange(filter)}
                                id={filter.name}
                            />
                            {filter.name} </label>
                    </div>)
            })
            }
        </>

    )
}
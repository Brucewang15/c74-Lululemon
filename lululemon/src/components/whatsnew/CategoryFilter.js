import {useDispatch} from "react-redux";
import {setFilter} from "../../redux/actions/filterAction";

export const CategoryFilter = ({filters}) => {

    const dispatch = useDispatch()
    const handleFilterChange = (filter) => {
        dispatch(setFilter('Category', {...filter, isChecked: !filter.isChecked}))
    }
    return (
        <>
            <h3>Category</h3>

            {filters && filters['Category'].map(filter => {
                return (
                    <div key={filter.name}>
                        <label htmlFor={filter.name}>
                            <input
                                type='checkbox'
                                checked={filter.isChecked}
                                onChange={() => handleFilterChange(filter)}
                                id={filter.name}
                            />
                            {filter.name}</label>

                    </div>)
            })
            }
        </>

    )
}
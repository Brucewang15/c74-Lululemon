import './SortBar.css';
import {removeFilters} from "../../redux/actions/filterAction";
import {useDispatch} from "react-redux";
import {useState} from "react";

export const SortBar = () => {
    const dispatch = useDispatch();
    const [sortingOption, setSortingOption] = useState('Featured');

    const handleSortChange = (option) => {
        setSortingOption(option);
        dispatch(setSortingOption(option));
    };

    const handleRemoveFilter = (filterType, filterValue) => {
        dispatch(removeFilters(filterType, filterValue));
    };

    return (
        <div className="navBar">
            <div className="navItem" onClick={() => { /* handle click */
            }}>
                All Items (232)
            </div>
            <div className="navItem" onClick={() => { /* handle click */
            }}>
                Available Near You
            </div>
                <div className="dropdown">
                    <button className="dropbtn">Sort by {sortingOption} &#x25BC;</button>
                    <div className="dropdownContent">
                        <div onClick={() => handleSortChange('Featured')}>Featured</div>
                        <div onClick={() => handleSortChange('New Arrivals')}>New Arrivals</div>
                        <div onClick={() => handleSortChange('Top Rated')}>Top Rated</div>
                        <div onClick={() => handleSortChange('Price: High to Low')}>Price: High to Low</div>
                        <div onClick={() => handleSortChange('Price: Low to High')}>Price: Low to High</div>
                    </div>
                </div>
        </div>
    )

}
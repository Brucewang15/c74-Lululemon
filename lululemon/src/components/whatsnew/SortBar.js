import './SortBar.css';
import {removeFilters} from "../../redux/actions/filterAction";
import {useDispatch, useSelector} from "react-redux";
import { setSortingOption } from '../../redux/actions/filterAction';
import {useState} from "react";

export const SortBar = () => {
    const dispatch = useDispatch();
    const [sortingOption, setSortingOptionState] = useState('Featured');
    const [activeTab, setActiveTab] = useState('All Items');

    const handleSortChange = (option) => {
        setSortingOptionState(option);
        dispatch(setSortingOption(option));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Handle additional logic for tab click if needed
    };

    return (
        <div className="navBar">
            <div
                className={`navItem ${activeTab === 'All Items' ? 'active' : ''}`}
                onClick={() => handleTabClick('All Items')}
            >
                All Items
            </div>
            <div
                className={`navItem ${activeTab === 'Available Near You' ? 'active' : ''}`}
                onClick={() => handleTabClick('Available Near You')}
            >
                Available Near You >
            </div>
            <div className="dropdown">
                <button className="dropbtn">
                    Sort by <span className="sortingOption">{sortingOption}</span> &#x25BC;
                </button>
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
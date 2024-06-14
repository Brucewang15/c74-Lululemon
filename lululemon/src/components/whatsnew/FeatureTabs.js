import {useDispatch, useSelector} from "react-redux";
import {removeFilters, selectTab, setFilter} from "../../redux/actions/filterAction";
import './FeatureTabs.scss'

export const FeatureTabs = () => {
    const filters = useSelector(state => state.filterReducer.filters)
    const dispatch = useDispatch()
    const selectedTab = useSelector(state => state.filterReducer.selectedTab)
    const handleFilterChange = (filterType, filterName, tabName) => {
        dispatch(removeFilters())
        const filter = filters[filterType].find(f => f.name === filterName)
        if (filter) {
            dispatch(setFilter(filterType, {...filter, isChecked: true}))
            dispatch(selectTab(tabName))
        } else dispatch(selectTab('All'))
    }
    return (
        <div className='featureTabsContainer'>
            <div
                onClick={() => {
                    dispatch(removeFilters());
                    dispatch(selectTab('All'));
                }}
                className={`featureTab ${selectedTab === 'All' ? 'active' : ''}`}
            >
                All What's New
            </div>
            <div
                onClick={() => handleFilterChange('Gender', 'Women', 'Women')}
                className={`featureTab ${selectedTab === 'Women' ? 'active' : ''}`}
            >
                Women's What's New
            </div>
            <div
                onClick={() => handleFilterChange('Gender', 'Men', 'Men')}
                className={`featureTab ${selectedTab === 'Men' ? 'active' : ''}`}
            >
                Men's What's New
            </div>
            <div
                onClick={() => handleFilterChange('Category', 'Accessories', 'Accessories')}
                className={`featureTab ${selectedTab === 'Accessories' ? 'active' : ''}`}
            >
                Accessories What's New
            </div>
        </div>
    );
};
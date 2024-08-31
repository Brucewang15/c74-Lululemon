import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {selectTab} from "../../redux/actions/filterAction";
import './FeatureImages.scss'

export const FeatureImages = () => {
    const selectedTab = useSelector(state => state.filterReducer.selectedTab);
    const filters = useSelector(state => state.filterReducer.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        // Ensure that the default tab is set to 'All' when the component mounts
        if (!Object.keys(filters).some(filterType => filters[filterType].some(filter => filter.isChecked))) {
            dispatch(selectTab('All'));
        }
    }, [dispatch]);

    const getImageForTab = (tab) => {
        switch (tab) {
            case 'Women':
                return {
                    img: 'https://images.lululemon.com/is/image/lululemon/na_Jun24_wk1_W_Skirts_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
                    des: 'A skirt for every scene'
                };
            case 'Men':
                return {
                    img: 'https://images.lululemon.com/is/image/lululemon/na_Jun24_wk3_M_OTM_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
                    des: 'Airy styles go with your flow'
                };
            case 'Accessories':
                return {
                    img: 'https://images.lululemon.com/is/image/lululemon/na_Jun24_wk2_W_OTM_CDP_Hero_D_Accessories?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
                    des: 'Joy-filled'
                };
            default:
                return {
                    img: 'https://images.lululemon.com/is/image/lululemon/na_May24_wk4_AG_OTM_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
                    des: 'Goes so easy together.'
                };
        }
    };

    const isSpecificFilterSelected = (filterType, filterNames) => {
        return filters[filterType] && filters[filterType].some(filter => filter.isChecked && filterNames.includes(filter.name));
    };

    const getSelectedSpecificFilters = () => {
        const selectedFilters = [];
        if (isSpecificFilterSelected('Gender', ['Men'])) selectedFilters.push('Men');
        if (isSpecificFilterSelected('Gender', ['Women'])) selectedFilters.push('Women');
        if (isSpecificFilterSelected('Category', ['Accessories'])) selectedFilters.push('Accessories');
        return selectedFilters;
    };

    const noFiltersSelected = !Object.keys(filters).some(filterType =>
        filters[filterType].some(filter => filter.isChecked)
    );

    const selectedSpecificFilters = getSelectedSpecificFilters();
    const moreThanOneSpecificFilterSelected = selectedSpecificFilters.length > 1;
    const anyOtherFiltersSelected = Object.keys(filters).some(filterType =>
        filters[filterType].some(filter => filter.isChecked && !['Men', 'Women', 'Accessories'].includes(filter.name))
    );

    return (
        <>

            {noFiltersSelected ? (
                <div className='featureImageContainer'>
                    <img className='featureImage' src={getImageForTab('All').img} alt="All What's New"/>
                    <p className='featureMessage'>Goes so easy together.</p>
                </div>
            ) : (
                !anyOtherFiltersSelected && !moreThanOneSpecificFilterSelected && selectedSpecificFilters.length === 1 && (
                    <div className='featureImageContainer'>
                        <img className='featureImage' src={getImageForTab(selectedSpecificFilters[0]).img}
                             alt={`${selectedTab} What's New`}/>
                        <p className='featureMessage'>{getImageForTab(selectedSpecificFilters[0]).des}</p>
                    </div>
                )
            )}
        </>
    );
};

// export const FeatureImages = () => {
//     const selectedTab = useSelector(state => state.filterReducer.selectedTab)
//     const filters = useSelector(state => state.filterReducer.filters)
//     const dispatch = useDispatch()
//     useEffect(() => {
//         // Ensure that the default tab is set to 'All' when the component mounts
//         if (!Object.keys(filters).some(filterType => filters[filterType].some(filter => filter.isChecked))) {
//             dispatch(selectTab('All'));
//         }
//     }, [dispatch]);
//     const getImageForTab = () => {
//         switch (selectedTab) {
//             case 'Women':
//                 return {
//                     img: 'https://images.lululemon.com/is/image/lululemon/na_Jun24_wk1_W_Skirts_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//                     des: 'A skirt for every scence'
//                 }
//             case 'Men' :
//                 return {
//                     img: 'https://images.lululemon.com/is/image/lululemon/na_Jun24_wk3_M_OTM_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72 ',
//                     des: 'Airy styles go with your flow'
//                 }
//             case 'Accessories':
//                 return {
//                     img: 'https://images.lululemon.com/is/image/lululemon/na_Jun24_wk2_W_OTM_CDP_Hero_D_Accessories?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//                     des: 'Joy-filled'
//                 }
//             default:
//                 return {
//                     img: 'https://images.lululemon.com/is/image/lululemon/na_May24_wk4_AG_OTM_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72 ',
//                     des: 'Goes so easy together.'
//                 }
//         }
//     }
//     const isSpecificFilterSelected = (filterType, filterNames) => {
//         return filters[filterType] && filters[filterType].some(filter => filter.isChecked && filterNames.includes(filter.name));
//     };
//
//     const isOnlyOneSpecificFilterSelected = () => {
//         const selectedFilters = [];
//         if (isSpecificFilterSelected('Gender', ['Men', 'Women'])) {
//             selectedFilters.push('Gender');
//         }
//         if (isSpecificFilterSelected('Category', ['Accessories'])) {
//             selectedFilters.push('Category');
//         }
//         return selectedFilters.length === 1;
//     };
//
//     const noFiltersSelected = !Object.keys(filters).some(filterType =>
//         filters[filterType].some(filter => filter.isChecked)
//     );
//
//     const anyOtherFiltersSelected = Object.keys(filters).some(filterType =>
//         filters[filterType].some(filter => filter.isChecked && !['Men', 'Women', 'Accessories'].includes(filter.name))
//     );
//
//     useEffect(() => {
//         // If all specific filters are deselected, set tab to 'All'
//         if (!isOnlyOneSpecificFilterSelected() || anyOtherFiltersSelected) {
//             dispatch(selectTab('All'));
//         }
//     }, [filters, dispatch, selectedTab]);
//     return (
//         <>
//             {noFiltersSelected ? (<>
//                 <img src={getImageForTab().img} alt={`${selectedTab} What's New`}/>
//                 <p>{getImageForTab().des}</p>
//             </>) : (
//                 isOnlyOneSpecificFilterSelected() && !anyOtherFiltersSelected && (
//                     <>
//                         <img src={getImageForTab().img} alt={`${selectedTab} What's New`}/>
//                         <p>{getImageForTab().des}</p>
//                     </>
//                 )
//             )
//
//             }
//
//
//         </>
//     )
// }
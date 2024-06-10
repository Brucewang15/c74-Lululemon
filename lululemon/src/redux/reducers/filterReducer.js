// for all the filter reducers


import {actionTypes} from "../actions/actionTypes";

const initialState = {
    filters: {
        // No need to set each initial value, it will dynamically add
        // Gender: [],
        // Category: [],
        // Type: [],
        // Color: [],
        // Activity: [],
        // Size: [],
        // SizeType: [],
        // Collection: [],
        // Features: [],
        // Climate: [],
        // Fabric: [],
    },
    requestBody: {}
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_FILTERS:
            // console.log(`Fetching filters for type: ${action.payload.filterType}`);

            return {
                ...state,
                filters: {
                    ...state.filters, [action.payload.filterType]: action.payload.filterValues
                }
            }
        case actionTypes.TOGGLE_FILTER:
            console.log(`Toggling filter: ${action.payload.filterValue.id || action.payload.filterValue.name}`);
            // 更新选中的filters
            const updatedFilters = {
                ...state.filters,
                // 动态的生成filterType的名字，比如说选到了gender这个选项，那[action.payload.filterType]就变成了gender
                [action.payload.filterType]: state.filters[action.payload.filterType].map(item =>
                    // use the unique id to select an individual filter
                    item.id === action.payload.filterValue.id
                        ? {
                            ...item,
                            // isChecked: action.payload.filterValue.isChecked
                            isChecked: !item.isChecked   // 这样就可以在reducer中直接出来反选逻辑而非在component中操作
                        } : item
                )
            }
            // 定义一个newRequestBody是为了过滤掉用户在前端勾选的filters，然后通过这个newRequestBody向后端服务器发送请求。（比如勾选了men），那么men就存在这里。
            const newRequestBody = Object.keys(updatedFilters).reduce((acc, filterType) => {
                const checkedFilters = updatedFilters[filterType].filter(filter => filter.isChecked).map(filter => filter.name || filter.id)
                if (checkedFilters.length > 0) acc[filterType] = checkedFilters
                return acc
            }, {})
            console.log('newRequestBody', newRequestBody)
            return {
                ...state,
                filters: updatedFilters,
                requestBody: newRequestBody
            }
        default:
            return state
    }
}

// filters: {
//     ...state.filters,
//     // 动态的生成filterType的名字，比如说选到了gender这个选项，那[action.payload.filterType]就变成了gender
//     [action.payload.filterType]: state.filters[action.payload.filterType].map(item =>
//         // use the unique id to select an individual filter
//         item.id === action.payload.filterValue.id
//             ? {
//                 ...item,
//                 // isChecked: action.payload.filterValue.isChecked
//                 isChecked: !item.isChecked   // 这样就可以在reducer中直接出来反选逻辑而非在component中操作
//             } : item
//     )
// }

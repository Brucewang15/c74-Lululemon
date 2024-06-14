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
    requestBody: {},
    filterExpand: {},
    filterViewMore: {},
    selectedTab: 'All'
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_FILTERS:
            console.log(`Fetching filters for type: ${action.payload.filterType}`);
            return {
                ...state,
                filters: {
                    ...state.filters, [action.payload.filterType]: action.payload.filterValues
                },
                // 默认页面刷新的时候expand是true，展示所有商品
                filterExpand: {
                    ...state.filterExpand, [action.payload.filterType]: true
                },
                filterViewMore: {
                    ...state.filterViewMore, [action.payload.filterType]: false
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
            // 定义一个newRequestBody是为了过滤掉用户在前端勾选的filters，然后通过这个newRequestBody向后端服务器发送请求。（比如勾选了men），那么men的true就存在这里并且和其他都是false的统统打包回去。
            const newRequestBody = Object.keys(updatedFilters).reduce((acc, filterType) => {
                acc[filterType] = updatedFilters[filterType].map(filter => {
                    if (filter.swatch) {
                        return {
                            swatch: filter.swatch,
                            alt: filter.alt,
                            isChecked: filter.isChecked
                        }
                    } else {
                        return {
                            name: filter.name,
                            isChecked: filter.isChecked
                        }
                    }
                })
                return acc
            }, {})
            console.log('newRequestBody', newRequestBody)
            return {
                ...state,
                filters: updatedFilters,
                requestBody: newRequestBody
            }
        case actionTypes.FILTER_EXPAND:
            let newFilterExpand = {...state.filterExpand}
            newFilterExpand[action.payload] = !state.filterExpand[action.payload]
            return {...state, filterExpand: newFilterExpand}

        case actionTypes.FILTER_VIEW_MORE:
            let newFilterViewMore = {...state.filterViewMore}
            newFilterViewMore[action.payload] = !state.filterViewMore[action.payload]
            return {...state, filterViewMore: newFilterViewMore}
        case actionTypes.REMOVE_FILTERS:
            const resetFilters = Object.keys(state.filters).reduce((acc, filterType) => {
                acc[filterType] = state.filters[filterType].map(filter => {
                    return {
                        ...filter, isChecked: false
                    }
                })
                return acc
            }, {})
            return {...state, requestBody: {}, filters: resetFilters}
        case actionTypes.SELECT_TAB:
            return {...state, selectedTab: action.payload}
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

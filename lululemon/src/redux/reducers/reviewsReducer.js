
const initialState = {
    reviews: []
}

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'fetchReviews':
            return {...state, reviews: action.payload}
        case 'addToHelpful':
            return {
                ...state,
                reviews: state.reviews.map((item, i) =>
                    i === action.payload ? {...item, helpful: item.helpful + 1} : item)
            }
        case 'reviewSort':
            const sortKey = action.payload
            if (sortKey === 'Most Recent') {
                return {
                    ...state,
                    reviews: [...state.reviews].sort((a, b) => a.id - b.id)
                }
            } else if (sortKey === 'Most Helpful') {
                    return {
                        ...state,
                        reviews: [...state.reviews].sort((a, b) => b.helpful - a.helpful)
                }
            } else if (sortKey === 'Highest to Lowest Rating') {
                return {
                    ...state,
                    reviews: [...state.reviews].sort((a, b) => b.rating - a.rating)
                }
            } else if (sortKey === 'Lowest to Highest Rating') {
                return {
                    ...state,
                    reviews: [...state.reviews].sort((a, b) => a.rating - b.rating)
                }
            }
            return state
        default:
            return state
    }
}

const reviews = [
    {id: 0, date: '6 hours ago', helpful: 5, size: 2, name: 'Claudia', rating: '4.7', title: 'Really good!', comment: 'Wish i got it a size smaller though its a bit big its so nice though good for running.'},
    {id: 1, date: '1 day ago', helpful: 1, rating: '4.2', title: 'Swiftly Tech', comment: 'I Love it! Its so cute and great for vacation!'},
    {id: 2, date: '2 days ago', helpful: 0, size: 4, rating: '5', title: 'Great Experience', comment: 'I have so many of these for working out. I always look for something else, but always come back to this top. Amazing for all types of workouts. 5’0” 107 lb, I wear size 2.'},
    {id: 3, date: '2 day ago', helpful: 2, name:'Bro123', rating: '4.5', title: 'Love', comment: 'Got me a totally of 16 compliments and the only place I want was target!'},
    {id: 4, date: '3 day ago', helpful: 0, name:'Queen', rating: '4.2', title: 'Amazing', comment: 'these are perfect for working out, dancing, and just relaxing.'},
    {id: 5, date: '4 day ago', helpful: 6, size: 2, rating: '5', title: 'Cool and comfortable', comment: 'The absolute best running shirt- keeps you covered yet cool. My go to at all times.'},
    {id: 6, date: '6 day ago', helpful: 3,  rating: '4.8', title: 'Comfy', comment: 'Super comfy and lightweight. I ordered my usual size 8, and it fits just right. It’s slightly loose, but it doesn’t gape in the armholes.'},
    {id: 7, date: '6 day ago', helpful: 0, name:'Leslie', rating: '5', title: 'Perfect', comment: 'lightweight and such a pretty color.'},
    {id: 8, date: '8 day ago', helpful: 1, size: 6, name:'Molly', rating: '5', title: 'Looks good, feels good', comment: 'I bought 1, then bought a second'},
    {id: 9, date: '9 day ago', helpful: 0, rating: '4.5', title: 'so cutee', comment: 'im in love with this tank want it in so many more colors! def recommend this to like everyone.'},
    {id: 10, date: '11 day ago', helpful: 0, name:'Julia', rating: '4.8', title: 'A staple', comment: 'One of my favorite! The race length is the perfect length!'},
    {id: 11,  date: '12 day ago', helpful: 0, rating: '4.2', title: 'Waist Length Swifty', comment: 'Not long enough for tall person.'}
]

export const fetchReviews = () => {
    return {
        type: 'fetchReviews',
        payload: reviews
    }
}

export const addToHelpful = (index) => {
    return {
        type: 'addToHelpful',
        payload: index
    }
}

export const reviewSort = (sortKey) => {
    return {
        type: 'reviewSort',
        payload: sortKey
    }
}
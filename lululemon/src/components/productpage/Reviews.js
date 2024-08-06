import './Reviews.scss'
import {ReviewCard} from "./ReviewCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReviews, reviewSort} from "../../redux/actions/reviewsActions";
import star_1_3 from "../../assets/star_1_3.svg";
import star_4_5 from "../../assets/star_4_5.svg";
import star_6_8 from "../../assets/star_6_8.svg";
import star_10 from "../../assets/star_10.svg";

export const Reviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviewsReducer.reviews)

    const changeHandler = (e) => {
        dispatch(reviewSort(e.target.value))
    }

    useEffect(() => {
        dispatch(fetchReviews())
    }, []);

    return (<div className='reviewsWrapper'>

        <div className='reviews'>

            <div className="reviewsHeader">
                <div className="reviewsHeaderTitle">
                    Reviews
                </div>
                <div className="reviewsHeaderDetails">
                    <div className="reviewsHeaderDetailsRating">
                        <div className="stars">
                            4.5
                            <div className="starsAll">
                                <img src={star_10} alt=""/>
                                <img src={star_10} alt=""/>
                                <img src={star_10} alt=""/>
                                <img src={star_10} alt=""/>
                                <img src={star_4_5} alt=""/>
                            </div>
                        </div>
                        <div className="count">
                            Based on {reviews.length} Reviews
                        </div>
                    </div>
                    <div className="reviewsHeaderDetailsSize">
                        <div className="reivewsHeaderDetailSizeSum">
                            Fits true to size
                        </div>
                        <div className="reviewsHeaderDetailsSizeRange">
                            Smaller
                            <div className="rangeBars">
                                <div className="range"></div>
                                <div className="range"></div>
                                <div className="range black"></div>
                                <div className="range"></div>
                                <div className="range"></div>
                            </div>
                            Larger
                        </div>
                    </div>
                    <button>
                        WRITE A REVIEW
                    </button>
                </div>
            </div>
            <div className="reviewsSection">
                <div className="reviewsFilter">
                    <div className="filterTitle">
                        Filter Reviews
                    </div>
                    <input className="search" type="text" placeholder="  Search Reviews"/>
                    <div className="filterRating">
                        <p>Rating</p>
                        <br/>
                        <div>
                            <input type="checkbox" id="5 stars" name="5 stars"/>
                            <label htmlFor="5 stars"> 5 stars</label><br/>
                            <input type="checkbox" id="4 stars" name="5 stars"/>
                            <label htmlFor="4 stars"> 4 stars</label><br/>
                            <input type="checkbox" id="3 stars" name="5 stars"/>
                            <label htmlFor="3 stars"> 3 stars</label><br/>
                            <input type="checkbox" id="2 stars" name="5 stars"/>
                            <label htmlFor="2 stars"> 2 stars</label><br/>
                            <input type="checkbox" id="1 stars" name="5 stars"/>
                            <label htmlFor="1 stars"> 1 stars</label><br/>
                        </div>
                        <hr/>
                    </div>
                    <div className="filterRating">
                        <p>Photos</p>
                        <br/>
                        <div>
                            <input type="checkbox" id="photos" name="photos"/>
                            <label htmlFor="photos"> Only show posts with images</label><br/>
                        </div>

                    </div>
                </div>
                <div className="reviewsContent">
                    <div className="reviewsSum">
                        <div className="reviewsSumCount">
                            Showing {reviews.length} results
                        </div>
                        <div className="reviewsSumSort">
                            <label htmlFor="sort">Sort by: </label>
                            <select name="sort" id="sort" onChange={changeHandler}>
                                <option value="Most Recent">Most Recent</option>
                                <option value="Most Helpful">Most Helpful</option>
                                <option value="Highest to Lowest Rating">Highest to Lowest Rating</option>
                                <option value="Lowest to Highest Rating">Lowest to Highest Rating</option>
                            </select>
                        </div>
                    </div>
                    <div className="reviewCards">
                        {reviews.length > 0
                            && reviews.map((item, index) => <ReviewCard
                                key={index}
                                index={index}
                                date={item.date}
                                helpful={item.helpful}
                                size={item.size}
                                name={item.name}
                                rating={item.rating}
                                title={item.title}
                                comment={item.comment}/>)}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
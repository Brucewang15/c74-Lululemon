import "./ReviewCard.scss";
import star_0 from "../../assets/star_0.svg";
import star_1_3 from "../../assets/star_1_3.svg";
import star_4_5 from "../../assets/star_4_5.svg";
import star_6_8 from "../../assets/star_6_8.svg";
import star_10 from "../../assets/star_10.svg";
import like_outline from "../../assets/like_outline.png";
import like_solid from "../../assets/like_solid.png";
import comment_icon from "../../assets/comment.png";
import { useDispatch, useSelector } from "react-redux";
import { addToHelpful } from "../../redux/actions/reviewsActions";

export const ReviewCard = ({
  index,
  date,
  helpful,
  size,
  name,
  rating,
  title,
  comment,
}) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  let helpCount = reviews[index].helpful;

  const stars = Array(Math.floor(rating)).fill(1);
  const starsDecimal = (Math.floor(rating * 10) % 10) / 10;
  stars.length < 5 && stars.push(starsDecimal);

  return (
    <div className="reviewCard">
      <div className="reviewer">
        <div className="reviewerInitial">{name && name.slice(0, 1)}</div>
        <div className="reviewerName">{name}</div>
        <div className="reviewTime">{date}</div>
      </div>
      <div className="reviewCardRating">
        {stars.length > 0 &&
          stars.map((item, index) => {
            if (item === 1) {
              return <img key={index} src={star_10} alt="" />;
            } else if (item <= 0.3) {
              return <img key={index} src={star_1_3} alt="" />;
            } else if (item <= 0.5) {
              return <img key={index} src={star_4_5} alt="" />;
            } else if (item <= 0.8) {
              return <img key={index} src={star_6_8} alt="" />;
            } else {
              return <img key={index} src={star_10} alt="" />;
            }
          })}
      </div>
      <div className="reviewCardTitle">{title}</div>
      <div className="reviewCardComment">{comment}</div>
      <div className="reviewCardSize">
        {size && (
          <div className="reviewCardSizeContainer">
            <div className="reviewCardSizeTitle">Size Purchased:</div>
            <div className="reviewCardSizeNum">{size}</div>
          </div>
        )}
        <div className="reviewCardSizeContainer">
          <div className="reviewCardSizeTitle">Fits:</div>
          <div className="reviewCardSizeNum">True to size</div>
        </div>
      </div>
      <div className="reviewReaction">
        <div className="reviewReactionHelpful">
          {helpCount > 0 ? (
            <div className="helpful">
              <img
                onClick={() => {
                  dispatch(addToHelpful(index));
                }}
                src={like_solid}
                alt="thumb"
              />
              {helpCount}
            </div>
          ) : (
            <div className="helpful">
              <img
                onClick={() => {
                  dispatch(addToHelpful(index));
                }}
                src={like_outline}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="leaveComment">
          <img src={comment_icon} alt="" />
          Leave a comment
        </div>
      </div>
    </div>
  );
};

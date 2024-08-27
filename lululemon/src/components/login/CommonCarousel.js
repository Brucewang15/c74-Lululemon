import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./CommonCarousel.css";

const CommonCarousel = () => {
  const navigator = useNavigate();

  const handleGoBackHome = () => {
    navigator(-1);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="imageGallery">
      <div className="back-button-container">
        <button
          className="back-button"
          aria-label="Back"
          onClick={handleGoBackHome}
        >
          <span className="arrow">
            <svg
              height="16"
              width="16"
              fill="none"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              role="img"
              aria-hidden="true"
            >
              <path
                d="m.215 7 5-5 .35.35a1 1 0 0 1 0 1.42l-3 3h9.18v.5a1 1 0 0 1-1 1h-8.19l3 3a1 1 0 0 1 0 1.42l-.35.35-5-5A.75.75 0 0 1 .215 7Zm14.53 1.28h-2v-.5a1 1 0 0 1 1-1h2v.5a1 1 0 0 1-1 1Z"
                fill="#000"
              ></path>
            </svg>
          </span>
          <span className="text">BACK</span>
        </button>
      </div>

      <Slider {...carouselSettings}>
        <div className="slide">
          <img
            src="https://images.lululemon.com/is/image/lululemon/NA_Jul24_Membership_Partner-Perks_LogInScreen_Main_Sign-in_D_Membership"
            alt="Lifestyle 1"
          />
          <div className="partnerPerks">
            <h2>Partner Perks</h2>
            <p>
              Move, fuel, and restore with brands we trust. You'll find new ways
              to support your wellbeing, your way, with member-only offers from
              Oura, La La Land, Barry's, Erewhon, Life Time, and more.
            </p>
          </div>
        </div>
        <div className="slide">
          <img
            src="https://images.lululemon.com/is/image/lululemon/NA_Jul24_Membership_Partner-Perks_LogInScreen_Main_Sign-in_D_PartnerPerks"
            alt="Lifestyle 2"
          />
          <div className="partnerPerks">
            <h2>Exclusive Access</h2>
            <p>
              Get early access to new products and limited editions, tailored
              just for our members.
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default CommonCarousel;

import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.scss'
import {useState} from "react";

export const ImageCarousel = ({images, handleModalOpen, alt}) => {
    const [heartActive, setHeartActive] = useState(false);

    const toggleHeart = () => {
        setHeartActive(!heartActive);
    };
    return (
        <>
            <Carousel
                showThumbs={true}
                showArrows={true}
                dynamicHeight={true}
                infiniteLoop={true}
            >
                {images.map((image, index) => (
                    <div className='imagesContainer' key={index} onClick={handleModalOpen}>
                        <img className='images' src={image} alt={alt}/>
                        <div className="heartContainer"
                             onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the modal
                            toggleHeart();
                        }}>
                            <button className={`heartButton ${heartActive ? 'active' : ''}`}>
                                ♥
                            </button>
                        </div>

                    </div>
                ))}
            </Carousel>
        </>

    )
}
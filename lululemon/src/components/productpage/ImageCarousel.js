import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.scss'

export const ImageCarousel = ({images, handleModalOpen, alt}) => {
    return (
        <Carousel showThumbs={true} showArrows={true} dynamicHeight={true} infiniteLoop={true}>
            {images.map((image, index) => (
                <div className='imagesContainer' key={index} onClick={handleModalOpen}>
                    <img className='images' src={image} alt={alt}/>
                </div>
            ))}
        </Carousel>
    )
}
import './Modal.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({images, close, alt, name}) => {


    return (
        <div className='modalContainer'>
            <div className='modalHeader'>
                <div className='backToProductContainer'>
                    <ChevronLeftIcon className='backArrow' onClick={close}/>
                    <h4 className='backToProduct' onClick={close}> Back to Product</h4>
                </div>
                <h3>{name}</h3>
                <CloseIcon className='closeModal' onClick={close}/>
            </div>

            {images.map((image, index) => <img
                key={index}
                className='images'
                onClick={close}
                src={image} alt={alt}/>)}
        </div>
    )
}
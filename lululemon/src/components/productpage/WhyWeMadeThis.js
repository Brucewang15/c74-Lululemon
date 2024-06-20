import './WhyWeMadeThis.scss'

export const WhyWeMadeThis = ({product, images, alt}) => {

    return (
        <div className='whyWeMadeThisContainer'>
            <div className='whyWeMadeThisText'>
                <div className='whyWeMadeThisTitle'>
                    <h1>Why we made this</h1>
                </div>
                <div className='whyWeMadeThisContent'>
                    <p>{product.whyWeMadeThis}</p>
                </div>
            </div>
            <div className='whyWeMadeThisImages'>
                {images && images.length > 2 &&
                    <div className='imagesContainer'>
                        <img src={images[0]} alt={alt[0]}/>
                        <img src={images[1]} alt={alt[1]}/>
                    </div>
                }
                {/* Edge cases, in case there is only one image for this product then show 1*/}
                {images && images.length === 1 &&
                    <div>
                        <img src={images[0]} alt={alt[0]}/>
                    </div>
                }

                {!images || images.length === 0 &&
                    <div>
                        <p>No Pictures For This Item, Check Later</p>
                    </div>
                }
            </div>

        </div>
    )
}
import './Swatches.scss'

export const Swatches = ({handleSwatchClick, product, selectedSwatchIndex}) => {
    return (<div className='swatchesContainer'>
        {product.swatches && product.swatches.map((swatch, index) => {
            return (

                <button key={index}
                        className='swatchButton'
                        onClick={() => handleSwatchClick(swatch.colorId, index, swatch.swatchAlt)}>
                    <img className={`swatch ${selectedSwatchIndex === index ? 'selected' : ''}`}
                         src={swatch.swatch}
                         alt={swatch.swatchAlt}
                    />
                </button>

            )
        })}
    </div>)
}
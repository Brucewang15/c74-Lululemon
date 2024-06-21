import './SizeButtons.scss'

export const SizeButtons = ({product, isSizeSelected, selectedSize, selectedSizeIndex, handleSizeButtonClick}) => {


    return (
        <div className='sizeContainer'>
            {product.sizes && product.sizes.map((sizeGroup, index) => {
                return (
                    <div key={index}>
                        <div className='selectSizeWord'>{isSizeSelected ? 'Size' : sizeGroup.title}
                            <div className='wordStyle'> {selectedSize}</div>
                        </div>
                        <div className='sizeButtonsContainer'>
                            {sizeGroup.details.map((size, i) =>
                                <button
                                    className={`${selectedSizeIndex === i ? 'sizeLettersButtonChecked' : 'sizeLettersButton'} `}
                                    key={i}
                                    onClick={() => handleSizeButtonClick(size, i)}
                                >{size ? size : 'nosize'}</button>
                            )}
                        </div>
                    </div>
                )
            })}
            <div className='soldoutWord'>Size sold out? Select size to get notified</div>
        </div>
    )
}
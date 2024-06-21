import './SizeButtons.scss'

export const SizeButtons = ({
                                product,
                                isSizeSelected,
                                selectedSize,
                                selectedSizeIndex,
                                handleSizeButtonClick,
                                handleLengthButtonClick,
                                isSizeGroup,
                                selectedLength, selectedLengthIndex
                            }) => {


    return (
        <div className='sizeContainer'>
            {product.sizes && product.sizes.map((sizeGroup, index) => {
                const isSize = sizeGroup.title === 'Select Size'
                return (
                    <div key={index}>
                        <div
                            className='selectSizeWord'>{isSizeSelected ? (isSize ? 'Size' : 'Length') : sizeGroup.title}
                            <div className='wordStyle'> {isSize ? selectedSize : selectedLength}</div>
                        </div>
                        <div className='sizeButtonsContainer'>
                            {sizeGroup.details.map((size, i) =>
                                <button
                                    className={`${isSize ? (selectedSizeIndex === i ? 'sizeLettersButtonChecked' : 'sizeLettersButton') : (selectedLengthIndex === i ? 'sizeLettersButtonChecked' : 'sizeLettersButton')} `}
                                    key={i}
                                    onClick={() => isSize ? handleSizeButtonClick(size, i) : handleLengthButtonClick(size, i)}
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
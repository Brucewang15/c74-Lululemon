// this is the filter for the size buttons.

import {useDispatch, useSelector} from "react-redux";
import {expandFilter, setFilter} from "../../redux/actions/filterAction";
import './SizeButtonFilter.scss'

export const SizeButtonFilter = ({filters, filterType}) => {
    const dispatch = useDispatch()
    const filterExpand = useSelector(state => state.filterReducer.filterExpand)
    const handleFilterChange = (filter) => {
        dispatch(setFilter(filterType, filter))
    }
    const sizeNumbers = filters[filterType].filter(item => !isNaN(Number(item.name)) && typeof (Number(item.name)) === 'number')
    const sizeLetter = filters[filterType].filter(item => isNaN(Number(item.name)) && item.name !== 'ONE SIZE')
    const sizeOneSize = filters[filterType].filter(item => item.name === 'ONE SIZE')

    const isVisible = filterExpand[filterType]
    return (

        <div className='sizeButtonFilter'>

            <div className='sizeFilterType' onClick={() => {
                dispatch(expandFilter(filterType))
            }}>
                <div className={isVisible ? 'sizeFilterTypeNameBold' : 'sizeFilterTypeName'}>{filterType}</div>
                <div className='sizeFilterToggle' key={filterType}>
                    {isVisible
                        ? <div className='sizeFilterToggleHorizontal'>|</div>
                        : <div>
                            <div className='sizeFilterToggleStatic'>|</div>
                            <div className='sizeFilterToggleVertical'>|</div>
                        </div>}
                </div>
            </div>
            {isVisible
                && <div className={`sizeAllButtons ${isVisible ? 'fadeIn' : 'fadeOut'}`}>
                    <div className='sizeNumbers'>
                        {sizeNumbers.map((filter, index) => filter.name !== 'sizeDivider'
                            && <button

                                className={filter.isChecked ? 'sizeNumbersButtonChecked' : 'sizeNumbersButton'}
                                key={filter.id || `${filterType}-${index}`}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter.name}
                            </button>)}
                    </div>
                    <div className='sizeLetters'>
                        {sizeLetter.map((filter, index) => filter.name !== 'sizeDivider'
                            && <button
                                className={filter.isChecked ? 'sizeLettersButtonChecked' : 'sizeLettersButton'}
                                key={filter.id || `${filterType}-${index}`}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter.name}
                            </button>)}
                    </div>
                    <div className='sizeOneSize'>
                        {sizeOneSize.map((filter, index) => filter.name !== 'sizeDivider'
                            && <button
                                className={filter.isChecked ? 'sizeLettersButtonChecked' : 'sizeLettersButton'}
                                key={filter.id || `${filterType}-${index}`}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter.name}
                            </button>)}
                    </div>
                </div>}
        </div>
    )
}
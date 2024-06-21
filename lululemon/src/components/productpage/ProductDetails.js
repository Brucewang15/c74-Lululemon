import './ProductDetails.scss'
import {useState} from "react";

export const ProductDetails = ({product, refs, handleScroll}) => {

    // const handleScrollToFeature = (index) => {
    //     if (refs.current && refs.current.length > 0 && index < refs.current.length) {
    //         refs.current[index].current.scrollIntoView({behavior: 'smooth'})
    //     }
    //
    // }
    return (
        <>
            <div className='detailsContainer'>
                <p className='details'>Details</p>
                <div className='featureDetailsContainer'>
                    {product.featureTitles && product.featureTitles.length !== 0 && product.featureTitles.map((featureTitle, index) => {
                            return (
                                <div className='featureTitleContainer' key={index}
                                     onClick={() => handleScroll(index)}>
                                    <img className='featureIcon' src={featureTitle.iconPath} alt={featureTitle.title}/>
                                    <button className='featureTitle'>{featureTitle.title}</button>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </>

    )
}
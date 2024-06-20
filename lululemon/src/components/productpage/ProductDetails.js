import './ProductDetails.scss'

export const ProductDetails = ({product}) => {
    return (
        <>
            <h1>This is Product Details</h1>
            <div className='detailsContainer'>
                <p className='details'>Details</p>
                <div className='featureDetailsContainer'>
                    {product.featureTitles && product.featureTitles.length !== 0 && product.featureTitles.map((featureTitle, index) => {
                            return (
                                <div className='featureTitleContainer' key={index}>
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
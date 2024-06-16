import {Link, useNavigate, useParams} from "react-router-dom";
import {Header} from "../shared/Header";
import Footer from "../shared/Footer";
import {useEffect, useState} from "react";
import axios from "axios";
import {myKey, productURL, singleProductURL} from "../../redux/helper";

export const ProductPage = () => {
    const {productID} = useParams()


    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    useEffect(() => {
        axios.get(`${singleProductURL}/${productID}?mykey=${myKey}`)
            .then(res => {
                const productData = res.data.rs
                console.log('productData ===>', productData)
                setProduct(productData)

            })
            .catch(error => {
                console.log('error fetching product', error)
            })

    }, [productID]);

    // 我定义了一个function暂时只show选取product中的第一张照片
    const showPicture = (imagesArr) => {
        if (imagesArr && imagesArr.length > 0) {
            const image = imagesArr[0].mainCarousel.media.split('|')
            return image[0]
        }
        return 'theres no image'
    }

    if (!product) {
        return <div>loading</div>
    }
    return (
        <>
            <Header/>
            <h3>this is productID : {productID}</h3>
            {product.images && <img src={showPicture(product.images)} alt={product.images[0].mainCarousel.alt}/>}
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>Why We Made This
                <div>{product.whyWeMadeThis}</div>
            </div>
            <div>
                {product.sizes && product.sizes.map((sizeGroup, index) => {
                    return (
                        <div key={index}>
                            <h3>{sizeGroup.title}</h3>
                            {sizeGroup.details.map((size, i) =>
                                <button key={i}>{size}</button>
                            )}
                        </div>
                    )
                })}
            </div>
            {product.swatches && product.swatches.map((swatch, index) => {
                return (
                    <img style={{width: '20px', height: "20px", borderRadius: "50%"}} key={index} src={swatch.swatch}
                         alt={swatch.swatchAlt}/>
                )
            })}
            {/*其他产品信息*/}
            <div>
                {/*底下这俩都是返回Whats New Page。看你们爱用哪个都行*/}
                <Link to='/'>To What's New Page </Link>
                <br/>
                <button onClick={() => navigate('/')}>Go Back to What's New Page</button>
            </div>
            <Footer/>
        </>
    )
}
import './CartCarousel.scss'
import {useEffect, useState} from "react";
export const CartCarousel = ({product, colorSelected}) => {
    const [imgId, setImgId] = useState(0)
    const [colorId, setColorId] = useState(colorSelected)
    let imgList = []

    console.log('img', colorSelected)
    console.log('imgs', product.images)

    product.images.map((item, i) => {
        if (item.colorId === colorSelected) {
            console.log(item.mainCarousel.media.split('|'))
            imgList = item.mainCarousel.media.split('|')
        }
    })

    useEffect(() => {
        product.images.map((item, i) => {
            if (item.colorId === colorSelected) {
                console.log(item.mainCarousel.media.split('|'))
                imgList = item.mainCarousel.media.split('|')
            }
        })
    }, [colorId]);

    // const imgUrls = images.split('|')
    return <div className='cardCarousel'>
        <img src={imgList[imgId]} alt=""/>
        <div className="arrows">
            {imgId > 0 &&
                <div className="arrowBefore" onClick={() =>
                    imgId > 0 && setImgId(imgId - 1)}>
                    {'<'}
                </div>
            }
            {imgId < imgList.length - 1 &&
                <div className="arrowNext" onClick={() =>
                    imgId < imgList.length - 1 && setImgId(imgId + 1)}>
                    {'>'}
                </div>
            }

        </div>
    </div>
}
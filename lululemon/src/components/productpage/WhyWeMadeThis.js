import './WhyWeMadeThis.scss'
import React, {useEffect, useRef, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const WhyWeMadeThis = ({product, images, alt, refs, expandedIndex, setExpendedIndex}) => {

    const handleExpand = (isPanel, index) => {
        // to make sure if the title has isPanel === true, then it can expand the content.
        if (isPanel)
            setExpendedIndex(prevIndex => prevIndex === index ? null : index)
    }
    // function that removes the 'click to expand'
    const fixTitleName = (title) => {
        const titleTrim = title.trim()
        return titleTrim.replace('(Click to Expand)', '')
    }

    return (
        <div className='wrapper'>
            <div className='whyWeMadeThisContainer'>
                <div className='whyWeMadeThisText'>
                    <div className='whyWeMadeThisTitle'>
                        <h2>Why we made this</h2>
                        <p className='dash'>__</p>
                    </div>
                    <div className='whyWeMadeThisContent'>
                        <p>{product.whyWeMadeThis}</p>
                    </div>
                </div>
                <div className='whyWeMadeThisImages'>
                    {images && images.length >= 2 &&
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
            <div className='featurePanelsContainer'>
                {product.featurePanels && product.featurePanels.length > 1 && (product.featurePanels.map((featurePanel, index) => {
                    return (
                        <div className='featurePanelContainer' ref={refs.current[index]} key={index}>
                            <div className='featurePanel' onClick={() => handleExpand(featurePanel.isPanel, index)}>
                                <div className='textContainer'>
                                    <img className='featureIcon' src={featurePanel.iconPath} alt={featurePanel.title}/>
                                    <h3 className='featureText'>{fixTitleName(featurePanel.title)} </h3>
                                </div>
                                <div className='iconContainer'>
                                    {(featurePanel.isPanel === true) && (expandedIndex === index ?
                                        <div className='icon'><RemoveIcon/></div> :
                                        <div className='icon'><AddIcon/></div>)}
                                </div>
                            </div>
                            {expandedIndex === index && <div className='contentContainer'>
                                {featurePanel.content && featurePanel.content.map((content, contentIndex) => {
                                        if (typeof content === 'object' && content.mediaUrl) {
                                            return <video src={content.mediaUrl} controls></video>
                                        }
                                        return (
                                            <div
                                                key={contentIndex} className='contentDetailContainer'>
                                                {content}
                                            </div>)
                                    }
                                )}
                            </div>}
                        </div>
                    )
                }))}
            </div>
        </div>
    )
}
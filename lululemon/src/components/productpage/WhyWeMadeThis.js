import './WhyWeMadeThis.scss';
import React, { useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const WhyWeMadeThis = ({ product, images, alt, refs, expandedIndex, setExpendedIndex }) => {
    const handleExpand = (isPanel, index) => {
        if (isPanel)
            setExpendedIndex(prevIndex => prevIndex === index ? null : index);
    };

    const fixTitleName = (title) => {
        return title.trim().replace('(Click to Expand)', '');
    };

    const renderContent = (featurePanel, index) => {
        const len = product.featurePanels.length;

        if (len - 1 === index) {
            let materials = featurePanel.content.filter(content => content.includes(':'));
            materials = materials[0].split(", ")
            const care = featurePanel.content.filter(content => !content.includes(':'));
            console.log(materials)
            return <>

                <h2>Materials</h2><br/>
                <div className="contentDetailContainerBig">
                    {materials.map((material, contentIndex) => (
                        <div key={`material-${contentIndex}`} className='contentDetailContainer'>
                        {material}
                        </div>
                    ))}
                </div>
                <h2>Care</h2><br/>
                <div className="contentDetailContainerBig">
                {care.map((careItem, contentIndex) => (
                    <div key={`care-${contentIndex}`} className='contentDetailContainer'>

                        {careItem}
                    </div>
                ))}
                </div>

            </>;
        } else {
            return (
                <>
                    {featurePanel.content.map((content, contentIndex) => (
                        <div key={`content-${contentIndex}`} className='contentDetailContainer'>
                            {content}
                        </div>
                    ))}
                </>
            );
        }
    };

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
                {product.featurePanels?.map((featurePanel, index) => (
                    <div className='featurePanelContainer' ref={refs.current[index]} key={index}>
                        <div className='featurePanel' onClick={() => handleExpand(featurePanel.isPanel, index)}>
                            <div className='textContainer'>
                                <img className='featureIcon' src={featurePanel.iconPath} alt={featurePanel.title}/>
                                <h3 className='featureText'>{fixTitleName(featurePanel.title)}</h3>
                            </div>
                            <div className='iconContainer'>
                                {featurePanel.isPanel && (expandedIndex === index ? <RemoveIcon/> : <AddIcon/>)}
                            </div>
                        </div>
                        {expandedIndex === index && (
                            <div className='contentContainer'>
                                {renderContent(featurePanel, index)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

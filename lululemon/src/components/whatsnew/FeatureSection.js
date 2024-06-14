import {FeatureImages} from "./FeatureImages";
import {FeatureTabs} from "./FeatureTabs";
import './FeatureSection.scss'

export const FeatureSection = () => {


    return (
        <div className='featureSectionContainer'>
            <FeatureImages/>
            <FeatureTabs/>
        </div>
    )
}
// what's new page (week 1)


import FilterContainer from "../components/whatsnew/FilterContainer";
import {useSelector} from "react-redux";
import ProductCard from "../components/whatsnew/ProductCard";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";
import {FeatureTabs} from "../components/whatsnew/FeatureTabs";
import {FeatureImages} from "../components/whatsnew/FeatureImages";
import {FeatureSection} from "../components/whatsnew/FeatureSection";
import {SortBar} from '../components/whatsnew/SortBar'

import WhatsNewMain from "../components/whatsnew/WhatsNewMain";
import './whatsNewPage.css';
import {Header} from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import {useEffect, useRef, useState} from "react";

export const WhatsNewPage = () => {
    const [isSticky, setIsSticky] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
            }
        );

        if (sentinel) {
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, []);


    return (
        <>
            <div className='whatsNewWrapper'>
                <div ref={sentinelRef}></div>
                <Header isSticky={isSticky}/>
                <div className='whatsNewPageLayout'>
                    <FilterContainer/>
                    <div className='whatsNewContainer'>
                        <FeatureSection/>
                        <SortBar/>
                        <CheckedFilters/>
                        <WhatsNewMain/>

                    </div>

                </div>
            </div>
            <Footer/>
        </>

    );

}
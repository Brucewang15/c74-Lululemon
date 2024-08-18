
import FilterContainer from "../components/whatsnew/FilterContainer";
import {CheckedFilters} from "../components/whatsnew/CheckedFilters";
import {FeatureSection} from "../components/whatsnew/FeatureSection";
import {SortBar} from '../components/whatsnew/SortBar'

import WhatsNewMain from "../components/whatsnew/WhatsNewMain";
import './whatsNewPage.css';
import {Header} from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import React, {useEffect, useRef, useState} from "react";
import {Outlet} from "react-router-dom";
import {ShoppingCart} from "./ShoppingCart";
import Suggestions from "../components/whatsnew/Suggestions";
import SuggestionsBar from "../components/whatsnew/SuggestionsBar";


export const SuggestionsPage = () => {
    const [isSticky, setIsSticky] = useState(false);
    // 'useRef' don't trigger re-render of the component
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
                    <SuggestionsBar/>
                    <div className='whatsNewContainer'>
                        <Suggestions/>
                        <Outlet/>
                    </div>

                </div>
                <Footer/>
            </div>
        </>

    );

}
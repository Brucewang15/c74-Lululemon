
import { CheckedFilters } from "../components/whatsnew/CheckedFilters";

import "./whatsNewPage.css";
import { Header } from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ShoppingCart } from "./ShoppingCart";
import SuggestionsBar from "../components/whatsnew/SuggestionsBar";
import TextSuggestions from "../components/whatsnew/TextSuggestions";

export const TextSearchPage = () => {
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
            <div className="whatsNewWrapper">
                <div ref={sentinelRef}></div>
                <Header isSticky={isSticky} />
                <div className="whatsNewPageLayout">
                    <SuggestionsBar />
                    <div className="whatsNewContainer">
                        {/*<CheckedFilters />*/}
                        <TextSuggestions />
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

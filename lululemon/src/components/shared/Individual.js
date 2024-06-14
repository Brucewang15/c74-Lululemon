import React from 'react';
import Dropdown from "./Dropdown";


const Individual = ({name, content, sections}) => {
    const [isOpen, setIsOpen] = React.useState(false);



    return <>
        <div
            className="individual"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >

            <a href="" id="animation">{name}</a>
            <Dropdown isOpen = {isOpen} content = {content} sections = {sections}/>


        </div>


    </>
}

export default Individual
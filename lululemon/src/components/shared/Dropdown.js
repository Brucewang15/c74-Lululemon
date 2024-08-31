import React from 'react';

const Dropdown = ({isOpen, content, sections}) => {

    // if (!isOpen) {return null;}
    return <>

        <div className="content">

            {content.map((category, i) => (
                <div key={i} className={sections[i]}>

                    {content[i].map((item, idx) => (
                        <a className="dropdownItem" href = "">{item}</a>
                    ))}
                </div>
            ))}




        </div>
    </>
}

export default Dropdown;
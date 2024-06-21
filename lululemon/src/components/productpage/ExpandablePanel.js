import React, { useState } from 'react';


const ExpandablePanel = ({ children, open, i, lastI}) => {



    console.log(open)
    return <>

        {children.map((stuff, index) => {

            if (lastI == i && index == 0) {
                const materials = children.filter(children => children.includes(':'));
                const care = children.filter(children => !children.includes(':'));
                console.log(materials, care, 10)
                return <>
                    <div className={`productContent ${open}`}>

                        <div className="materials">
                            {materials.map((stuff2, index) => (
                                stuff2
                            ))}
                        </div>

                        <div className="care">
                            {care.map((stuff3, index) => (
                                stuff3
                            ))}
                        </div>


                    </div>
                </>
            }
            else {
                return <>
                    <div className={`productContent ${open}`}>
                        {stuff}
                    </div>
                </>
            }







        })}

    </>
}

export default ExpandablePanel;
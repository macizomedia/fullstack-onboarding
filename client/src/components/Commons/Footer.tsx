import React from 'react'
/* 

TODO >> Turn the component into a reusable fragment 

Steps:
    1. import styled-component library.
    2. create a Divider or Wrapper/Frame Element with display & position properties.
    3. create paragragh element `<p>{text}</p>` that accepts text props.
    4. add props argument into footer function declaration 
    
    HINT: Check Button fragment to follow example 
    NOTE: Can be done without types

*/
function Footer() {
    return (
        <div>
            <div>
                <p className="text-3">Our data privacy and imprint</p>
            </div>
        </div>
    )
}

export default Footer

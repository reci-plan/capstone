import { React, useState } from 'react';
import './Box.css'

var dum = -1;
var test = 0;
//Pass elements into popup with props.children
export default function Box(props) {
    // const [boxVals, setBoxVals] = useState(-1)

    // const increment = () => {
    //     setBoxVals(dum += 1)
    //   }
    const {caption} = props;
    const {lines, setLines} = props.pstate;
    test = parseInt(props.caption[props.caption.length -1]);

    //PASS TIME AND MEAL NAME TO CAPTION
    return (
        <div className="boxHolder">
            {console.log("TEST", test)}
            {console.log("TEST COMP", test, lines.length)}
            {console.log("MY CAPTION", caption)}
            {test === (lines.length - 1) ?
                <>
                <div className="box"><div className="penIc" onClick={() => props.handleOpenForm()}><img src="https://i.imgur.com/SR5qJxc.png" className="add" alt="add meal"></img></div></div>
                </> : 
                <div className="box"><div className= {caption} onClick={() => setLines([...lines, lines.length])}>{caption}</div></div>
            }
            
        </div>
    )
}
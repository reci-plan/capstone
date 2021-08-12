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
            {console.log("TRY: ", props.renderMealData)}
            {test === (lines.length - 1) ?
                <>
                <div className="just">
                    <div onClick={() => props.handleOpenForm()}><img src="https://i.imgur.com/SR5qJxc.png" className="add" alt="add meal"></img></div>
                    <p>add a meal to your plan!</p>
                </div>
                </> : 
                <div className="box"><div className= {caption}>{props.renderMealData[0][test]}&nbsp;{props.renderMealData[1][test]}<br></br>{props.renderMealData[2][test]}</div></div>
            }
            
        </div>
    )
}
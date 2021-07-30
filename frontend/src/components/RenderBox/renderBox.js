import { React, useState } from 'react';
import './renderBox.css'
import Box from "../Box/Box";

var dum = -1;
var linesToDisplay = [0]
//Pass elements into popup with props.children
export default function RenderBox(props) {
  console.log("COUNT STARTING", props.dataWheelToBox)
  if (props.dataWheelToBox >= 0) {
    var temp = props.dataWheelToBox + 1
    if (!linesToDisplay.includes(temp))
        linesToDisplay.push(temp)
    console.log("LINES TO DISPLAY: ", linesToDisplay)
  }
  //linesToDisplay.push(1)
  const [lines, setLines] = useState(linesToDisplay);

    return (
        lines.slice(0,4).map(m=><Box key={m} caption={`Click ${m}`} pstate={{lines, setLines}} handleOpenForm = {props.handleOpenForm} renderMealData = {props.renderMealData}/>)
    )
}
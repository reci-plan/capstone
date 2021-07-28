import { React, useState } from 'react';
import './renderBox.css'
import Box from "../Box/Box";

var dum = -1;
//Pass elements into popup with props.children
export default function RenderBox(props) {
  const [lines, setLines] = useState([0]);

    return (
        lines.slice(0,4).map(m=><Box key={m} caption={`Click ${m}`} pstate={{lines, setLines}}/>)
    )
}
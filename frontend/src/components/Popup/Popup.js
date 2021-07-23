import { useState } from 'react';
import './Popup.css'

//Pass elements into popup with props.children
export default function Popup(props) {

    //Pass in boolean (true or false popup) to trigger code. If true, will show- else, shows nothing
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}
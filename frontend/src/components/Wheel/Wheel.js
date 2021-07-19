import { useState } from 'react';
import './Wheel.css'
import { Wheel } from 'react-custom-roulette'
import Popup from '../Popup/Popup'
import Menu from '../Menu/Menu'

import pencil from '../../assets/pencil.svg'

export default function Generator() {
  const [wheelIsVisible, setWheelIsVisible] = useState(true)
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  //for recipe popup
  const [buttonPopup, setButtonPopup] = useState(false);

  const data = [
    { option: 'a', style: { backgroundColor: 'green', textColor: 'black' }, category: 1},
    { option: 'b', category: 0},
    { option: 'c', category: 1},
  ]

  //Use a query to get all the recipes that fit the category selected.
  //SELECT id or name FROM all_recipes WHERE category = [SELECTED CATEGORY FROM WHEEL]
  //load options into an array like so: 
  for (let i = 0; i < 30; i++) {
    data.push({ option: 'a', category: 0})
  }

  console.log(data)

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    console.log(newPrizeNumber)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
    console.log(data[newPrizeNumber].option)
    console.log(data[prizeNumber].category)
  }
  
  const handleOpenForm = () => {
    setWheelIsVisible(false)
  }

  const handleCloseForm = () => {
    setWheelIsVisible(true)
  }

  return (
    <div className="Generator">
      <div className="header">Spin the wheel to plan your meal</div>
      <div className="fullPage">
        <div className="menuView">
          <div className="fake-input">
              <input type="text" required placeholder="Name your meal plan!"></input>
              <img src={pencil} width="25" alt="Edit your plan name"></img>
          </div>
          <div className="subHeader">Meals</div>
          <div className="box"><div className="penIc"><div onClick={(handleOpenForm)}><img src="https://i.imgur.com/SR5qJxc.png" className="add" alt="add meal"></img></div></div></div>
        </div>
        <div className="wheelView">
        {wheelIsVisible ?
        <>
        {/* https://github.com/effectussoftware/react-custom-roulette */}
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}

            onStopSpinning={() => {
              setMustSpin(false)
              setButtonPopup(true)
            }}
          />
          <button onClick={handleSpinClick}>SPIN</button>
        </> : 
        <div className="menuParent">
          <div className="menuHeader">
          <div className="close"><div onClick={(handleCloseForm)}><img src="https://svgshare.com/i/ZL_.svg"></img></div></div>
            <div className="menuItem">Edit a meal</div>
          </div>
          <Menu></Menu>
        </div>
        }
      </div>
      </div>

      {/* https://www.npmjs.com/package/react-wheel-of-prizes?activeTab=readme */}

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>My popup</h3>
          
          <p>This is my button triggered popup</p>

          {(data[prizeNumber].option)}
          {(data[prizeNumber].category)}

      </Popup>
    </div>
  )
}
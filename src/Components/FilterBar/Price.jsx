import './Price.css'

import {Radio, Text } from '../Input/Input.jsx'

function Price({ handleOne, handleRange }) {
  return (
    <div className='filter-price'>
        <div className="price-range">
            <Text callback={(e) => handleRange(e,'min')}/> To <Text callback={(e) => handleRange(e,'max')}/>
        </div>
        <Radio 
            id = "radio1"
            callback={(e) => handleOne(e,0)}
            name = "price" 
            label = "Under 100$"
            value = {100}
        />
        <Radio 
            id = "radio2"
            callback={(e) => handleOne(e,100)}
            name = "price" 
            label = "100 - 200$"
            value = {200}
        />
        <Radio 
            id = "radio3"
            callback={(e) => handleOne(e,200)}
            name = "price" 
            label = "200 - 500$"
            value = {500}
        />
        
    </div>
  )
}

export default Price
import React from 'react'
import { useState } from 'react'
import "./CustomInput.css"

const CustomInput = (props) => {

    console.log(props);
    
    const [customValue, setCustomValue] = useState()
    console.log(customValue);

  return (
    <div>
        <div className='shipping-input'>
            <label>{props.label}</label>
            <input 
                type={props.type}
                onChange={(e)=> setCustomValue(e.target.value)}
                value={customValue}
            />
        </div>
    </div>
  )
}

export default CustomInput
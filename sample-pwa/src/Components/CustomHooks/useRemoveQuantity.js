import React from 'react'
import { useState } from 'react'

const UseRemoveQuantity = ({quantity}) => {
    const [count, setCount] = useState(quantity)

    return setCount(count-1)
}

export default UseRemoveQuantity
import React from 'react'
import { useState } from 'react'

const UseIncreaseQuantity = (quantity) => {

    const [increasedCount, setCount] = useState(quantity)

    const increament = () => setCount(prevCount => prevCount+1)

    return {increament, increasedCount}
}

export default UseIncreaseQuantity
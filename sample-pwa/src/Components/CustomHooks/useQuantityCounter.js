import React from 'react'
import { useState } from 'react'

const UseQuantityCounter = (quantity) => {

    const [count, setCount] = useState(quantity)

    const decreament = () => setCount(prevCount => prevCount - 1)
    const increament = () => setCount(prevCount => prevCount + 1)

    return [increament, decreament, count]
}

export default UseQuantityCounter
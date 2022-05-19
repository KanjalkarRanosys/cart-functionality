import React from 'react'

const UseDecreaseQuantity = () => {
    const [decreasedCount, setCount] = useState(quantity)

    const increament = () => setCount(prevCount => prevCount - 1)

    return {increament, decreasedCount}
}

export default UseDecreaseQuantity
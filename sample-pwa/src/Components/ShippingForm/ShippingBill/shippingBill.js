import React from 'react'

const ShippingBill = (props) => {
  return (
    // <div>
        <div className='cart-total-quantity'>
                        <div className='desc-quantity-total'>
                            <span className='desc-key'>Sub-Total: </span>
                            <span className='desc-value'>{props.subTotal}</span>
                        </div>
                    <br />
                    <br />
                    <div className='desc-quantity-total'>
                        <span className='desc-key'>{props.quantity ? "Quantity: ": "Total: "}</span>
                        <span className='desc-value'>{props.quantity ? props.quantity : props.total}</span>
                    </div>
                </div>
    // </div>
  )
}

export default ShippingBill
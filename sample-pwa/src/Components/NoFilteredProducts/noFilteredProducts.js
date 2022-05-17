import React from 'react'
import { Link } from 'react-router-dom'

const NoFilteredProducts = (props) => {
  return (
    <div>
        <div className='order-status'>
        <div className='order-status-content'>
          <div className='order-status-img'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4q40XE-vkCTENuXFZ4zeTM2_fzbivN3orT2zFz2AiBQwZNfroGVXyfaxEOF_Xx7iW_7I&usqp=CAU' />
          </div>
          <div className='order-status-message'>
            <h2>Sorry, we couldn't find any results</h2>
            {/* <span>You will be receiving a email with confirmation details</span> */}
          </div>
          <div className='explore-more'>
            <Link to="/">
              <button>Explore more Products</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoFilteredProducts
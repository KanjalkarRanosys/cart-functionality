import React from 'react'
import "./CustomFooter.css"

const CustomFooter = () => {
  return (
    <div className='custom-footer'>
    <div className='divider footer-divider' />
    <div className='footer-options'>
      <div>
        <button>About Us</button>
        <ul>
          <li>Our Story</li>
          <li>Email SignUp</li>
          <li>Give Back</li>
        </ul>
      </div>
      <div>
        <button>Contact Us</button>
        <ul>
          <li>Customer Service</li>
          <li>Order Service</li>
          <li>Return</li>
        </ul>
      </div>
      <div className='follow-us-p'>
        <button>Follow Us</button>
          <p>Lorem ipsum dolor sit amet, consectetur adipsicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
      </div>
      <div>
        <button>Account</button>
        <ul>
          <li>SignIn</li>
          <li>Register</li>
          <li>Order Status</li>
          <li>Return</li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default CustomFooter
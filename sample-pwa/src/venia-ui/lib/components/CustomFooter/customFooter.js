import React from 'react'

const CustomFooter = () => {
  return (
    <div style={{display: "flex", justifyContent:"space-around", padding: "10px 40px", height:"200px", background:"rgb(213 213 213)"}}>
        <button style={{backgroundColor: "gray", padding:"10px 80px", height:"40px", color: "white"}}>About Us</button>
        <button style={{backgroundColor: "gray", padding:"10px 80px", height:"40px", color: "white"}}>Contact Us</button>
        <button style={{backgroundColor: "gray", padding:"10px 80px", height:"40px", color: "white"}}>Follow Us</button>
        <button style={{backgroundColor: "gray", padding:"10px 80px", height:"40px", color: "white"}}>Accoutn</button>
    </div>
  )
}

export default CustomFooter
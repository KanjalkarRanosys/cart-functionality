import { useMutation } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import GoogleReCaptcha from '../../venia-ui/lib/components/GoogleReCaptcha'
import CustomInput from '../input/customInput'
import "./SignIn.css"

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        getUserDetail({
            variables: {
                email: email,
                password: password
            }
        })
    }

  return (
    <div className='sign-in'>
        <div className='sign-in-form'>
            <form onSubmit={handleSubmit}>
                <h1>Sign In To Your Account</h1>
                <CustomInput label="Email Address:" type="text" />
                <CustomInput label="Password:" type="text" />
                <div className='sign-in-button'>
                    <button type="submit" >SIGN IN</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn
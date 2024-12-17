import React, { useState } from 'react'
import { useUserContext } from '../../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const { user } = useUserContext()
    const handleInputChange = (index, value) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        console.log(otp)
    }
    const navigate = useNavigate()
    const combineOtp = parseInt(otp.join(''))
    const handleOnsubmit = async (e) => {
        e.preventDefault();
        const email = user?.user?.email
        const dataotp = { email, combineOtp }
        const verifyotp = 'http://localhost:8080/api/v1/user/verifyotp'
        fetch(verifyotp, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataotp)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {

                    toast.success(data.message)
                    location.reload()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            })
    }
    return (

        <div className='relative min-h-screen pt-[20vh] flex-col justify-center overflow-hidden bg-gray-50 py-12'>
            <div className='relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto max-w-lg rounded-2xl'>
                <div className='max-auto flex w-full max-w-md flex-col space-y-16'>
                    <div className='flex flex-col items-center justify-center text-center space-y-2'>
                        <div className='font-semibold text-3xl'>
                            <p>Email Verification</p>
                        </div>
                        <div className='flex flex-row text-sm font-medium text-gray-400'>
                            verification mail sent to your email {user?.user?.email}
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleOnsubmit}>
                            <div className='flex flex-col space-y-16'>
                                <div className='flex justify-center items-center'>
                                {
                                    otp.map((digit, index) => (
                                        <input 
                                        key={index} 
                                        type="text" 
                                        value={digit} 
                                        maxLength='1' 
                                        onChange={(e) => handleInputChange(index, e.target.value)} className='w-12 h-12 mx-2 border border-gray-300 rounded text-center text-xl' />
                                    ))
                                }
                                </div>
                            </div>
                            <button type='submit' className='w-full py-3 px-4 bg-red-700 mt-12 rounded text-white'> verify</button>
                            <ToastContainer/>
                        </form>
                    </div>
                </div>
            </div>
            {/* <form className='ease-in duration-300 w-[80%] mx-auto  shadow-lg backdrop-blur-md bg-white/80 lg:w-[50%] items-center rounded-md px-10 py-8 h-96'>
                <label className='text-center text-gray-900 text-base mb-2'>
                    Enter your OTP to verify your account
                </label>
                <div className='flex mt-4 items-center justify-between'>
                    <input type="text" className="w-16 h-12 form-control" placeholder="" />
                    <input type="text" className="w-16 h-12 form-control" placeholder="" />
                    <input type="text" className="w-16 h-12 form-control" placeholder="" />
                    <input type="text" className="w-16 h-12 form-control" placeholder="" />
                    <input type="text" className="w-16 h-12 form-control" placeholder="" />
                    <input type="text" className="w-16 h-12 form-control" placeholder="" />
                </div>
            </form> */}
        </div>
    )
}

export default VerifyOtp
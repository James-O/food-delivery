import React, { useState } from 'react'
import logo from "../assets/cheflogo1.png"
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx"
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

function Navbar() {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useUserContext()
    console.log(user)

    const handleNav = () => {
        setNav(!nav);
    }
    return (
        <>
            <div className="bg-white/80 shadow-md fixed top-0 left-0 z-40 w-full ease-in duration-300 backdrop-blur-md">
                {/* <div className='bg-red-500 py-4 px-4 text-white -z-30'><Link to={'/verifyOtp'}>Please verify</Link></div> */}
                {
                    user?.user.isVerified === false && <div className='bg-red-500 py-4 px-4 text-white'>
                        <Link to={'/verifyOtp'}>Please verify</Link>
                    </div>
                }
                <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 container mx-auto">

                    <div className="flex items-center justify-between">
                        <Link to={'/'}>
                            <img src={logo} alt="food logo" className="h-16 cursor-pointer hover:scale-125" />
                        </Link>
                        <div className='lg:flex hidden gap-8 items-center '>
                            <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Today special</a>
                            <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Why special</a>
                            <a href='/menu' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Our menu</a>
                            {
                                user?.user?.isVerified === false && <div className='bg-red-500 py-4 px-4 text-white'>
                                    <Link to={'/verifyOtp'}>Please verify</Link>
                                </div>
                            }
                            {
                                user?.user?.role === 'admin' && <Link to='/addfood' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Add food</Link>
                            }

                            <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Popular food</a>

                            {
                                user ? (<div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Profile Image"
                                                src={user?.user?.profileImage} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><button onClick={() => {
                                            localStorage.clear();
                                            location.reload();
                                            navigate('/')
                                        }}>Logout</button></li>
                                    </ul>
                                </div>) : (<Link to={'/login'} className='bg-red-900 active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-semibold text-white'>login</Link>)
                            }

                        </div>
                        <div className="block lg:hidden z-40" onClick={handleNav}>
                            {
                                nav ? (<RxCross2 size={25} className='text-[#191919] cursor-pointer' />) : (<TiThMenu className='text-red-500 cursor-pointer' size={25} />)
                            }
                        </div>
                        <div className={`lg:hidden absolute sm:w-1/3 md:w-1/4 sm:h-2/5 px-4 py-2 text-xs font-medium ease-in shadow-sm backdrop-blur-md top-20 duration-500 ${nav ? "right-0" : "right-[-100%] pt-24"}`}>
                            <div className='flex flex-col gap-8 relative bg-white/80 py-8 px-3'>
                                <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Today special</a>
                                <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Why special</a>
                                <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Our menu</a>
                                <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Add food</a>
                                <a href='' className='text-[#191919] text-xl font-semibold hover:text-red-500'>Popular food</a>
                                <Link to={'/login'} className='bg-red-900 active:scale-90 w-1/2 transition duration-100 transform hover:shadow-xl shadow-md rounded-full pl-4 pr-16 py-2 text-xl font-semibold text-white'>login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
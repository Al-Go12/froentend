import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { set_Authentication, updateUserProfile } from '../../store/slice';
import { BASE_URL } from '../../constant/api_url';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Screens51 from '../../additional/Group40.png'

function User_login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", e.target.email.value);
        formData.append('password', e.target.password.value);
        try {
            const response = await axios.post(BASE_URL + '/api/Login', formData);
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                const user_name = jwtDecode(response.data.access).username;
                dispatch(
                    set_Authentication({
                        name: user_name,
                        isAuthenticated: true,
                        isAdmin: response.data.isAdmin
                    })

                );


                console.log(response.data.authuser)

                dispatch(
                    updateUserProfile(response.data.authuser))

                toast("Login successful");    
                navigate('/');
               

            }
        } catch (error) {
            console.log(error?.response)

            toast.error(error?.response?.data?.error)
        }
    };
    return (
        <div div className='w-full h-screen flex bg-[#181818] items-center'>
            <div className=' flex-1 flex flex-col justify-center items-center'>
                <div style={{ backgroundColor: 'rgb(38,38,38)', padding: '20px', borderRadius: '20px', width: '60%', height: '70%', marginTop: '10vh' }}>
                    <ToastContainer />
                    <form onSubmit={login} style={{ textAlign: 'center', marginTop: '30%' }}>
                        <div>
                            <h1 style={{ color: 'whitesmoke' }}>LOGIN</h1>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input type='email' placeholder="Email" style={{ margin: '10px', height: '50px', padding: '10px', paddingLeft: '15px', borderRadius: '15px', width: '80%', backgroundColor: '#181818', color: '#fff' }} id='email' />
                        </div>
                        <div>
                            <input type='password' placeholder="Password" style={{ margin: '10px', height: '50px', padding: '10px', paddingLeft: '15px', borderRadius: '15px', width: '80%', backgroundColor: '#181818', color: '#fff' }} id='password' />
                        </div>


                        <div className=' flex justify-between  mx-10 my-6'>
                            
                            <div >
                            
                            <button type="submit" className='bg-yellow-600 p-3 rounded-xl w-30 ' >Login</button>
                            </div>

                            <div className="text-sm ">
                                <Link
                                    to={'/forgot-password'}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 text-decoration-none"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div style={{ cursor: 'pointer', marginTop: '30%', color: 'whitesmoke' }}>


                            <Link to='/signup'>

                                <h4>new user? Click here to signup</h4>

                            </Link>
                        </div>

                    </form>

                </div>
            </div>
            {/* Right Section */}
            <div className=' m-0 p-0 flex-1  justify-center  md:h-3/4 md:w-3/4 hidden md:flex'>
                <div className='w-full h-full  bg-no-repeat md:bg-contain' style={{ backgroundImage: `url(${Screens51})` }}>
                    {/* Empty div */}
                </div>
            </div>


        </div>
    );
}

export default User_login;

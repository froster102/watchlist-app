import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from "../services/mutations";
import { RotatingLines } from 'react-loader-spinner'
import { useAuthStore } from "../store/authStore";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('')
    const signUpMutation = useSignUpMutation()
    const location = useLocation()
    const pathname = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    const { accessToken } = useAuthStore()

    useEffect(() => {
        if (accessToken) {
            navigate(pathname)
        }
    }, [])

    function signUp(credentials) {
        signUpMutation.mutate({ ...credentials }, {
            onSuccess: () => {
                navigate('/signin', { replace: true })
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        })
    }

    function handle(e) {
        e.preventDefault()
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !password) {
            toast.error('All fields should be filled', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            return
        } else if (!regex.test(email)) {
            toast.error('Enter a valid email', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            return
        } else if (password.length < 8) {
            toast.error('Password must be least 8 character', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            return
        } else if (password !== confirm) {
            toast.error('Password do not match', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            return
        }
        signUp({ email, password })
        setEmail('')
        setPassword('')
        setConfirm('')
    }

    return (
        <>
            <div className="flex justify-center items-center h-dvh px-2">
                <div className="p-10 bg-secondary border border-zinc-800 w-96 rounded-xl">
                    <h1 className="text-white text-center font-bold text-2xl">Sign up</h1>
                    <div><Toaster></Toaster></div>
                    <form action="" onSubmit={handle}>
                        <div className="mt-4">
                            <span className="block text-white">Email</span>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="text" value={email} className="bg-zinc-800 p-4 rounded-lg mt-2 text-white w-full h-10 outline-none" placeholder="" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-white" >Password</span>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className="block bg-zinc-800 p-4 mt-2 rounded-lg text-white w-full h-10 outline-none" placeholder="" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-white" >Confirm Password</span>
                            <input onChange={(e) => { setConfirm(e.target.value) }} value={confirm} type="password" className="block bg-zinc-800 p-4 mt-2 rounded-lg text-white w-full h-10 outline-none" placeholder="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="bg-white mt-5 px-4 py-2 text-black rounded-lg transition ease-in flex justify-center items-center" disabled={signUpMutation.isLoading} >
                                {signUpMutation.isLoading ?
                                    <RotatingLines width={'20'} ></RotatingLines> : 'Sign up'}
                            </button>
                        </div>
                        <span className="block text-white mt-2 text-sm self-end">Have a account already ?<Link className="underline font-bold ml-2" to='/signin' >Sign in here</Link> </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader'
import { useSignInMutaion } from '../services/mutations';
import { useAuthStore } from '../store/authStore';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.state?.from?.pathname || '/'
    const signInMutation = useSignInMutaion()
    const { accessToken } = useAuthStore()

    useEffect(() => {
        if (accessToken) {
            navigate(pathname)
        }
    }, [])

    function signIn(credentials) {
        signInMutation.mutate({ ...credentials }, {
            onSuccess: () => navigate('/'),
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        })
    }

    async function handle(e) {
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
        } else if (!regex.test(email)) {
            toast.error('Enter a valid email', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        } else {
            signIn({ email, password })
            setEmail('')
            setPassword('')
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-dvh px-2">
                <div className="p-10  bg-secondary border border-zinc-800  w-96 rounded-xl">
                    <h1 className="text-white text-center font-bold text-2xl">Sign In</h1>
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
                        <div className='flex justify-center items-center'>
                            <button className="bg-white mt-5 px-4 py-2 text-black rounded-lg transition ease-in" disabled={signInMutation.isLoading} >
                                {signInMutation.isLoading ?
                                    <FadeLoader width={'5'} ></FadeLoader> : 'Login'}
                            </button>
                        </div>
                        <span className="block text-white mt-2 text-sm self-end">Dont't have a account<Link className="underline font-bold ml-2" to='/signup' >register here</Link> </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn
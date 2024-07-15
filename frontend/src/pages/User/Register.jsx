import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/userSlice';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('')
    const [register,{isLoading}] = useRegisterMutation()
    const navigate = useNavigate()

    const user = useSelector(state=>state.auth.userId)

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user])

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
        } else if (password.length < 8) {
            toast.error('Password must be least 8 character', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        } else if (password !== confirm) {
            toast.error('Password do not match', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
        else {
            try{
                const res = await register({email,password})
                console.log(res)
                navigate('/login')
                toast.success('Registration succesfull please login')
            }catch(e){
                toast.error(e?.data?.message)
            }
            setEmail('')
            setPassword('')
            setConfirm('')
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-dvh px-2">
                <div className="p-10 bg-zinc-900 w-96 rounded-xl">
                    <h1 className="text-white font-bold text-2xl">Register</h1>
                    <div><Toaster></Toaster></div>
                    <form action="" onSubmit={handle}>
                        <div className="mt-4">
                            <span className="block text-white">Email</span>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="text" value={email} className="bg-zinc-800 p-4 rounded-lg mt-2 text-white w-full h-10" placeholder="" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-white" >Password</span>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className="block bg-zinc-800 p-4 mt-2 rounded-lg text-white w-full h-10" placeholder="" />
                        </div>
                        <div className="mt-4">
                            <span className="block text-white" >Confirm Password</span>
                            <input onChange={(e) => { setConfirm(e.target.value) }} value={confirm} type="password" className="block bg-zinc-800 p-4 mt-2 rounded-lg text-white w-full h-10" placeholder="" />
                        </div>
                        <button className="bg-gray-700 mt-5 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition ease-in" >Register</button>
                        <span className="block text-white mt-2 text-sm self-end">Have a account already ?<Link className="underline font-bold ml-2" to='/login' >login here</Link> </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
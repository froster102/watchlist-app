import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAdminLoginMutation } from '../../features/adminApiSlice';
import { setCredentials } from '../../features/authSlice';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const [adminLogin, { isLoading }] = useAdminLoginMutation()
    const navigate = useNavigate()

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
            try {
                const res = await adminLogin({ email, password }).unwrap()
                dispatch(setCredentials(res))
                console.log(res)
                navigate('/admin/', { replace: true })
            } catch (e) {
                toast.error(e?.data?.message)
                console.log(e)
            }
            setEmail('')
            setPassword('')
        }
    }
    

    return (
        <>
            <div className="flex justify-center items-center h-dvh px-2">
                <div className="p-10 bg-zinc-900 w-96 rounded-xl">
                    <h1 className="text-white font-bold text-2xl">Login</h1>
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
                        <button className="bg-gray-700 mt-5 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition ease-in" >Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
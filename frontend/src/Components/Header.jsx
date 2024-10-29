import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetProfileQuery } from '../features/userApiSlice'
import { useLogoutMutation } from '../features/apiSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'

export const Header = ({ text, role, imageUrl }) => {
    const [image, setImage] = useState('')
    const [openDropdown, setOpenDropDown] = useState(false)
    const { data, refetch } = useGetProfileQuery()
    const [logoutUser, { isLoading }] = useLogoutMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        refetch()
        setImage(data?.imageUrl)
    }, [data, imageUrl])

    return (
        <>
            <div className="text-white flex items-center justify-between relative">
                <h1 className='font-bold'>{text}</h1>
                <div className='w-fit' onMouseEnter={() => { setOpenDropDown(true) }} onMouseLeave={() => { setOpenDropDown(false) }}>
                    <img className='object-cover h-10 w-10 bg-white rounded-full ml-auto mr-4' src={image || '/user-default.jpg'} alt="" />
                    <div className='pt-1'>
                        {openDropdown && role === 'user' && <ul className='absolute top-full right-0 bg-zinc-700 border-[1px] border-zinc-600 rounded-md p-2 z-50'>
                            <li className='hover:underline transition ease-in' ><Link to='/profile'>Profile</Link></li>
                            <li className='hover:underline transition ease-in' ><Link to='/'>Home</Link></li>
                            <li onClick={() => {
                                logoutUser()
                                dispatch(logout())
                            }} className='hover:underline transition ease-in'>Log Out</li>
                        </ul>}
                        {openDropdown && role === 'admin' && <ul className='absolute right-0 top-12 bg-zinc-700 border-[1px] border-zinc-600 rounded-md p-2 z-50'>
                            <li onClick={() => {
                                logoutUser()
                                dispatch(logout())
                            }} className='hover:underline transition ease-in'>Log Out</li>
                        </ul>}
                    </div>

                </div>
            </div>
            <div className='h-[1px] bg-zinc-600 mt-2'></div>
        </>
    )
}

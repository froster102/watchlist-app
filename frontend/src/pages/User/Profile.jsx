import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../../Components/Header'
import { useGetProfileQuery } from '../../features/userApiSlice'
import { useAddImageMutation } from '../../features/userApiSlice'

export const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [overlay, setOverlay] = useState(false)
    const { data, refetch } = useGetProfileQuery()
    const [image, setImage] = useState('')
    const [uploadImage, { isLoading }] = useAddImageMutation()

    console.log(data)

    useEffect(() => {
        console.log('render')
        refetch()
        setUsername(data?.email.split('@')[0])
        setEmail(data?.email)
        setImage(data?.imageUrl)
    }, [data])

    async function handleChange(e) {
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
        const res = await uploadImage(file)
    }

    return (
        <>
            <div className="flex items-center justify-center h-dvh px-2">
                <div className="p-2 border-[1px] border-zinc-700 bg-zinc-800 rounded-lg w-[402px] md:w-[534px] lg:w-[666px]">
                    <div className="flex flex-col">
                        <Header text='My Profile' role='user' imgUrl={image} ></Header>
                    </div>
                    <div className='mt-4 flex justify-evenly'>
                        <div className='h-[100px] w-[100px] bg-white rounded-full overflow-hidden  relative' onMouseEnter={() => { setOverlay(true) }} onMouseLeave={() => { setOverlay(false) }} >
                            <img className='object-cover w-full h-full' src={image || '/user-default.jpg'} alt="" />
                            {overlay ?
                                <div className='absolute top-0 bg-zinc-500 opacity-50 h-[100px] w-[100px] rounded-full flex items-center'>
                                    <p className='text-center text-xs'>Click to upload image</p>
                                    <input onChange={handleChange} className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' type='file' accept='image/jpeg, image/png'></input>
                                </div>
                                : ''}
                        </div>
                        <div className='border-[1px] border-zinc-700 w-fit'></div>
                        <div className='text-white'>
                            <p>Username: {username}</p>
                            <p>Email: {email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

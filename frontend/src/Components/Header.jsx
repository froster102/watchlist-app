import React, { useState } from 'react'

export const Header = ({ text, role }) => {
    const [openDropdown, setOpenDropDown] = useState(false)

    return (
        <>
            <div className="text-white flex items-center relative">
                {openDropdown ? role === 'user' ? <ul className='absolute right-0 top-12 bg-zinc-700 border-[1px] border-zinc-600 rounded-md p-2 z-50'>
                    <li className='hover:underline transition ease-in' >Profile</li>
                    <li className='hover:underline transition ease-in'>Log Out</li>
                </ul> : '' : ''}
                <h1 className='font-bold'>{text}</h1>
                <div onClick={() => { setOpenDropDown(!openDropdown) }} className='h-10 w-10 bg-white rounded-full ml-auto mr-4' ></div>
            </div>
            <div className='h-[1px] bg-zinc-600 mt-2'></div>
        </>
    )
}

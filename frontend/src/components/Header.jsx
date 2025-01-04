import { useState } from 'react'

export const Header = ({ text, role, imageUrl }) => {
    const [image, setImage] = useState('')
    const [openDropdown, setOpenDropDown] = useState(false)


    return (
        <>
            <div className="text-white flex items-center justify-between relative">
                <h1 className='font-bold'>{text}</h1>

            </div>
            <div className='h-[1px] bg-zinc-600 mt-2'></div>
        </>
    )
}

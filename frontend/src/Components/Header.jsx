import React from 'react'

export const Header = ({text}) => {
    return (
        <>
            <div className="text-white flex items-center">
                <h1 className='font-bold'>{text}</h1>
                <div className='h-10 w-10 bg-white rounded-full ml-auto' ></div>
            </div>
            <div className='h-[1px] bg-zinc-600 mt-2'></div>
        </>
    )
}

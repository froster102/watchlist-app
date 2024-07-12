import React from 'react'
import { Header } from '../../Components/Header'

export const Profile = () => {
    return (
        <>
            <div className="flex items-center justify-center h-dvh px-2">
                <div className="p-2 border-[1px] border-zinc-700 bg-zinc-800 rounded-lg w-[402px] md:w-[534px] lg:w-[666px]">
                    <div className="flex flex-col">
                        <Header text='My Profile' ></Header>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

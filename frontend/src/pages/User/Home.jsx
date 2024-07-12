import { useState } from 'react'
import { Header } from "../../Components/Header"
import { Main } from "../../Components/Main"
import { SearchBar } from "../../Components/SearchBar"


function Home() {
    return (
        <>
            <div className="flex items-center justify-center h-dvh px-2">
                <div className="p-2 border-[1px] border-zinc-700 bg-zinc-800 rounded-lg w-[402px] md:w-[534px] lg:w-[666px]">
                    <div className="flex flex-col">
                        <Header text='My Watchlist' role='user' ></Header>
                        <Main></Main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
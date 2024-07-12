import React from 'react'
import { FaSearch} from 'react-icons/fa'

export const SearchBar = () => {
    return (
        <>
            <div className='flex items-center bg-zinc-600 w-fit mt-2 px-4 py-1 rounded-md'>
                <FaSearch></FaSearch>
                <input type="text" className='ml-1 bg-zinc-600 text-white focus:border-none focus:outline-none' placeholder='Add movies' />
            </div>
        </>
    )
}

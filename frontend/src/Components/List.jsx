import React from 'react'

export const List = ({ results }) => {
    return (
        <>
            {results.length > 0 ? <div className='absolute top-10 bg-zinc-600 rounded-md px-4 py-1 text-white text-center w-full list-none mt-2 max-h-56 overflow-x-scroll scrollbar-hide'>
                {results.map((result, i) => {
                    return <li className='border-b-2 h-[80px]' key={result.id}>
                        <div className='flex'>
                            <img className='h-[76px] w-[64px] object-cover' src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`} alt="" />
                            <span className='text-sm ml-4'>{result.title}</span>
                        </div>
                    </li>
                })}
            </div> : ''}
        </>
    )
}

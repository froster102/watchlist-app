import React from 'react'

export const List = ({ results, setMovies, setInput }) => {
    return (
        <>
            {results.length > 0 ? <div className='absolute top-10 bg-zinc-900 rounded-md px-4 py-2 text-white text-center w-full list-none mt-2 max-h-56 overflow-x-scroll scrollbar-hide'>
                {results.map((result, i) => {
                    return <li className='border-[1px] bg-zinc-900 border-zinc-700 rounded-md mt-1 hover:bg-zinc-800 h-[80px] transition ease-in' key={result.id}
                    onClick={()=>{setMovies((prevState)=>{
                        return [...prevState,result]
                    })
                setInput('')
                }}
                    >
                        <div className='flex'>
                            <img className='h-[76px] w-[64px] object-cover' src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`} alt="movie image" />
                            <span className='text-sm ml-4'>{result.title}</span>
                        </div>
                    </li>
                })}
            </div> : ''}
        </>
    )
}

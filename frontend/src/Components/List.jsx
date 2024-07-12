import React from 'react'

export const List = ({ results }) => {
    return (
        <>
            {results.length > 0 ? <div className='bg-zinc-600 rounded-md px-4 py-1 text-white text-center w-full list-none mt-2 max-h-56 overflow-x-scroll scrollbar-hide'>
                {results.map((result, i) => {
                    return <li key={i}>
                        {result}
                    </li>
                })}
            </div> : ''}
        </>
    )
}

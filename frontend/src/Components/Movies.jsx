import React from 'react'

export const Movie = ({title,image}) => {
  return (
    <div className='h-[150px] w-[120px] bg-zinc-950 rounded-md'>
        <div>{title}</div>
        {image}
    </div>
  )
}

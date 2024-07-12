import { useState} from 'react'
import { Movie } from './Movies'
import { SearchBar } from './SearchBar'
import { List } from './List'

export const Main = () => {
    const [movies, setMovies] = useState([])

    return (
        <>
            <SearchBar></SearchBar>
            <div className='mt-4'>
                <div className='flex gap-3 flex-wrap'>
                    <Movie title='' image='' ></Movie>
                    <Movie title='' image='' ></Movie>
                    <Movie title='' image='' ></Movie>
                    <Movie title='' image='' ></Movie>
                    <Movie title='' image='' ></Movie>
                    <Movie title='' image='' ></Movie>
                </div>
            </div>
        </>
    )
}

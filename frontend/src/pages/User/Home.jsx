import { useState } from 'react'
import { Header } from "../../Components/Header"
import { SearchBar } from "../../Components/SearchBar"
import { Movie } from '../../Components/Movies'


function Home() {
    const [movies, setMovies] = useState([])
    console.log('render')
    console.log(movies)
    return (
        <>
            <div className="flex items-center justify-center h-dvh px-2">
                <div className="p-2 border-[1px] border-zinc-700 bg-zinc-800 rounded-lg w-[402px] md:w-[534px] lg:w-[666px]">
                    <div className="flex flex-col">
                        <Header text='My Watchlist' role='user' ></Header>
                        <SearchBar movies={movies} setMovies={setMovies}></SearchBar>
                        <div className='mt-4'>
                            <div className='flex gap-3 flex-wrap'>
                                {movies.map((movie) => {
                                    return <Movie key={movie.id} title={movie.title} image={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} ></Movie>

                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { List } from './List'

const Movies = ['Prisoner', 'John Wick', 'Interstellar', 'Batman', 'Tenet', 'Inception']

export const SearchBar = () => {
    const [input, setInput] = useState()
    const [results, setResults] = useState([])

    function search(input) {
        if (input !== '') {
            console.log(input)
            const result = Movies.filter((movie) => {
                return movie.toLowerCase().includes(input.toLowerCase())
            })
            setResults((prevState) => result)
        } else {
            setResults([])
        }
    }

    return (
        <>
            <div className='flex flex-col w-fit'>
                <div className='flex items-center bg-zinc-600 w-fit mt-2 px-4 py-1 rounded-md'>
                    <FaSearch></FaSearch>
                    <input type="text" onChange={((e) => { search(e.target.value) })} placeholder='Add movies' className='block ml-1 bg-zinc-600 text-white focus:border-none focus:outline-none' />
                </div>
                    <List results={results} ></List>
                
            </div>

        </>
    )
}

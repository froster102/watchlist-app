import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { List } from './List'
import axios from 'axios'


export const SearchBar = () => {
    const [input, setInput] = useState()
    const [results, setResults] = useState([])
    async function search(input) {
        if (input !== '') {
            console.log(input)
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${apiKey}`)
            setResults((prevState) => response.data.results)
        } else {
            setResults([])
        }
    }
    return (
        <>
            <div className='flex flex-col w-full relative'>
                <div className='flex items-center bg-zinc-600 w-full mt-2 px-4 py-1 rounded-md'>
                    <FaSearch></FaSearch>
                    <input type="text" onChange={((e) => { search(e.target.value) })} placeholder='Add movies' className='block ml-1 bg-zinc-600 text-white focus:border-none focus:outline-none w-full' />
                </div>
                <List results={results} ></List>

            </div>

        </>
    )
}

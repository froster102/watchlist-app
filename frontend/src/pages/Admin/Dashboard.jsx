import { useState, useEffect } from 'react'
import { Header } from '../../Components/Header'
import { FaSearch } from 'react-icons/fa'
import { useGetUsersQuery, useDeleteUserMutation, useEditUserInfoMutation } from '../../features/adminApiSlice'
import { EditModal } from '../../Components/EditModal.jsx'

export const Dashboard = () => {
    const [users, setUsers] = useState([])
    const { data, refetch } = useGetUsersQuery()
    const [deleteUser, { isLoading }] = useDeleteUserMutation()
    const [modal, setModal] = useState(false)
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [editUser] = useEditUserInfoMutation()

    useEffect(() => {
        refetch()
        console.log('render')
        setUsers(data?.users)
    }, [data])

    console.log(data)

    function filterUser(text) {
        if (text) {
            const filteredUsers = users.filter((user) => {
                return user.email.toLowerCase().includes(text)
            })
            setUsers(filteredUsers)
        } else {
            setUsers(data?.users)
        }
    }

    function closeModal() {
        setModal(!modal)
        setEmail('')
        setUserId('')
    }

    async function editUserInfo(id, email) {
        console.log(id,email)
        try {
            const res = await editUser(id,email).unwrap()
            setModal(!modal)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="flex modal-container items-center justify-center h-dvh px-2">
                <div className="relative p-2 border-[1px] border-zinc-700 bg-zinc-800 rounded-lg w-[402px] md:w-[534px] lg:w-[666px]">
                    {modal ? <EditModal id={userId} email={email} onClick={closeModal} onClickEdit={editUserInfo} ></EditModal> : ''}
                    <div className="flex flex-col">
                        <Header text='Dashboard' role='admin'></Header>
                        <div className='flex items-center bg-zinc-600 w-fit mt-2 px-4 py-1 rounded-md'>
                            <FaSearch></FaSearch>
                            <input type="text" placeholder='Search Users' onChange={(e) => { filterUser(e.target.value) }} className='ml-1 bg-zinc-600 text-white focus:border-none focus:outline-none' />
                        </div>
                        <div className='p-2'>
                            <table className="table-auto text-white mt-4 w-full">
                                <thead className='border-b-2 border-b-zinc-700 '>
                                    <tr>
                                        <th className='text-left'>User</th>
                                        <th className='text-left'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users && users.map((user) => {
                                            return (<tr key={user._id}>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        deleteUser(user._id)
                                                        refetch()
                                                    }} className='bg-gray-700 rounded-md hover:bg-gray-600 transition ease-in mt-2'><svg fill='black' className='h-[32px] w-[32px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M 33 13 C 31.895 13 31 13.895 31 15 L 31 16 L 18 16 C 15.791 16 14 17.791 14 20 C 14 21.973645 15.432361 23.602634 17.3125 23.929688 L 19.707031 52.664062 C 20.050031 56.777062 23.553641 60 27.681641 60 L 46.318359 60 C 50.446359 60 53.949969 56.778062 54.292969 52.664062 L 56.6875 23.929688 C 58.567639 23.602634 60 21.973645 60 20 C 60 17.791 58.209 16 56 16 L 43 16 L 43 15 C 43 13.895 42.105 13 41 13 L 33 13 z" /></svg></button>
                                                    <button
                                                        onClick={() => {
                                                            setModal(!modal)
                                                            setUserId(user._id)
                                                            setEmail(user.email)
                                                        }}
                                                        className='bg-gray-700 rounded-md hover:bg-gray-600 transition ease-in ml-1'><svg className='h-[32px] w-[32px]' fill='black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64px" height="64px"><path d="M57.828,22.266c1.562,1.562,1.562,4.095,0,5.657L32.108,53.644L16.52,58.857c-2.088,0.698-4.076-1.29-3.378-3.378	l5.213-15.587l25.721-25.721c1.562-1.562,4.095-1.562,5.657,0L57.828,22.266z M42.905,25.243L24.471,43.676l-1.703,5.092	l0.463,0.463l5.092-1.703l18.434-18.434L42.905,25.243z" /></svg></button>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

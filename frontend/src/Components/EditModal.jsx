import { useState } from "react"

export function EditModal({ id, email, onClick, onClickEdit }) {
    const [userId, setUserId] = useState(id)
    const [userEmail, setUserEmail] = useState(email)
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <div className="absolute top-16 p-2 border-[1px] border-zinc-700 w-52 bg-zinc-800 rounded-lg flex flex-col items-center" >
                    <button onClick={onClick} className="w-fit px-2 rounded-lg bg-zinc-700 ml-auto">X</button>
                    <input onChange={(e) => { setUserEmail(e.target.value) }} type="text" className="bg-zinc-200 font-medium rounded-md h-[32px] p-2 mt-2" value={userEmail} />
                    <button onClick={() => {
                        onClickEdit({userId, userEmail})
                    }} className="block bg-zinc-900 w-fit px-4 py-1 text-white font-bold rounded-lg mt-4 hover:bg-zinc-950 transition ease-in">Edit</button>
                </div>
            </div>
        </>
    )
}

import { Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import { Profile } from './pages/User/Profile'


function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/register' element={<Register></Register>} ></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
      </Routes>
    </>
  )
}

export default App

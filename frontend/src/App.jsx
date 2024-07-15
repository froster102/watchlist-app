import { Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import { Profile } from './pages/User/Profile'
import { Dashboard } from './pages/Admin/Dashboard'
import AdminLogin from './pages/Admin/AdminLogin'
import RequireUserAuth from './Components/RequireUserAuth'



function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/register' element={<Register></Register>} ></Route>
        <Route element={<RequireUserAuth></RequireUserAuth>}>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
        </Route>
        <Route path='/admin/login' element={<AdminLogin></AdminLogin>}></Route>
        <Route path='/admin/' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </>
  )
}

export default App

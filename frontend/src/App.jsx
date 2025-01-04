import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Profile } from './pages/Profile'
import RequireUserAuth from './components/RequireUserAuth'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signin' element={<SignIn></SignIn>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>} ></Route>
        <Route element={<RequireUserAuth></RequireUserAuth>}>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
        </Route>
        <Route path='*' element={<NotFound></NotFound>} ></Route>
      </Routes>
    </>
  )
}

export default App

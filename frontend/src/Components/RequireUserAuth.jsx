import { useLocation,Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken,selectCurrentUserRole } from "../features/authSlice"

function RequireUserAuth() {
    const token = useSelector(selectCurrentToken)
    const role = useSelector(selectCurrentUserRole)
    const location = useLocation()

    return (
        token && role==='user' ? <Outlet></Outlet> : <Navigate to='/login' state={{from:location}} replace />
    )
}

export default RequireUserAuth
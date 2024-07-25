import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentRole, selectCurrentToken } from "../features/authSlice"

function RequireUserAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    const role = useSelector(selectCurrentRole)
    return (
        token && role === 'user' ? <Outlet></Outlet> : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireUserAuth
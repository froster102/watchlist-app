import { selectCurrentRole, selectCurrentToken } from "../features/authSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

function RequireAdminAuth() {
    const location = useLocation()
    const token = useSelector(selectCurrentToken)
    const role = useSelector(selectCurrentRole)

    return (
        token && role==='admin' ? <Outlet></Outlet> : <Navigate to='/admin/login' state={{ from: location }} ></Navigate>
    )
}

export default RequireAdminAuth
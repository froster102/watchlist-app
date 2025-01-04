import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

function RequireUserAuth() {
    const location = useLocation()
    const authToken = useAuthStore((state) => state.accessToken)
    return (
        authToken ? <Outlet></Outlet> : <Navigate to='/signin' state={{ from: location }} replace />
    )
}

export default RequireUserAuth
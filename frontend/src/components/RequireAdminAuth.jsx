import { Navigate, Outlet, useLocation } from "react-router-dom"

function RequireAdminAuth() {
    const location = useLocation()

    return (
        '' ? <Outlet></Outlet> : <Navigate to='/admin/login' state={{ from: location }} ></Navigate>
    )
}

export default RequireAdminAuth
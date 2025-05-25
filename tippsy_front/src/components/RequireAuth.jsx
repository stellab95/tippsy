import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }){
    const user = JSON.parse(localStorage.getItem('user'))

        if(!user) {
            return <Navigate to="/login" replace />
        }

        const hasRole = user.roles.some(role => allowedRoles.includes(role))

        return hasRole ? <Outlet /> : <Navigate to="/unauthorized" replace />
}

export default RequireAuth
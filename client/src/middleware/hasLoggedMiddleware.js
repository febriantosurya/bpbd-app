import { Navigate } from "react-router-dom"

export default function hasLoggedMiddleware(page) {
    try {
        const token = localStorage.getItem('token')
        const level = localStorage.getItem('level')
        if (token) {
            if (level === "0") {
                return <Navigate to="/kelolaadmin" replace />
            }
            else {
                return <Navigate to="/dashboard" replace />
            }
        } else {
            return page;
        }
    } catch (error) {}
}

import { Navigate } from "react-router-dom"

export default function hasLoggedMiddleware(page) {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            return <Navigate to="/kelolaadmin" replace />
        } else {
            return page;
        }
    } catch (error) {}
}

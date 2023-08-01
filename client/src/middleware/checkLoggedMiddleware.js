import { Navigate } from "react-router-dom"

export default function checkLoggedMiddleware(page) {

    try {
        const token = localStorage.getItem('token')
        if (!token) {
            return <Navigate to="/" replace />
        } else {
            return page;
        }
    } catch (error) { }
}

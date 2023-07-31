import { createBrowserRouter } from "react-router-dom";
import checkLoggedMiddleware from "../../middleware/checkLoggedMiddleware";
import hasLoggedMiddleware from "../../middleware/hasLoggedMiddleware";
import {
    KelolaAdmin,
    KelolaUser,
    Login,
    Dashboard,
    RegisterBencanaAdmin,
    RegisterBencanaUser,
    InputRegBencana,
    ErrorHandler,
    ArchiveActive,
    ArchiveInactive,
    Inventaris,
    HabisPakai
} from '../../pages'
const router = createBrowserRouter([
    {
        path: "*",
        element: <ErrorHandler />
    },
    {
        path: "/",
        element: hasLoggedMiddleware(<Login />)
    },
    {
        path: "/kelolaadmin",
        element: checkLoggedMiddleware(<KelolaAdmin />)
    },
    {
        path: "/kelolauser",
        element: checkLoggedMiddleware(<KelolaUser />)
    },
    {
        path: "/dashboard",
        element: checkLoggedMiddleware(<Dashboard />)
    },
    {
        path: "/register-bencana",
        element: checkLoggedMiddleware(<RegisterBencanaAdmin />)
    },
    {
        path: "/register-bencana-user",
        element: checkLoggedMiddleware(<RegisterBencanaUser />)
    },
    {
        path: "/input-reg-bencana",
        element: checkLoggedMiddleware(<InputRegBencana />)
    },
    {
        path: "/arsip-aktif",
        element: checkLoggedMiddleware(<ArchiveActive />)
    },
    {
        path: "/arsip-inaktif",
        element: checkLoggedMiddleware(<ArchiveInactive />)
    },
    {
        path: "/habispakai",
        element: checkLoggedMiddleware(<HabisPakai />)
    },
    {
        path: "/inventaris",
        element: checkLoggedMiddleware(<Inventaris />)
    }
]);
export default router;

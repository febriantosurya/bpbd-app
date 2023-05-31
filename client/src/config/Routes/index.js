import { createBrowserRouter } from "react-router-dom";
import { KelolaAdmin, KelolaUser, Login, Dashboard, RegisterBencanaAdmin, InputRegBencana } from '../../pages'
import checkLoggedMiddleware from "../../middleware/checkLoggedMiddleware";
import hasLoggedMiddleware from "../../middleware/hasLoggedMiddleware";

const router = createBrowserRouter([
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
        path: "/input-reg-bencana",
        element: checkLoggedMiddleware(<InputRegBencana />)
    }
]);
export default router;

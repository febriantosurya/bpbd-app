import { createBrowserRouter } from "react-router-dom";
import { KelolaAdmin, Login } from '../../pages'
import checkLoggedMiddleware from "../../middleware/checkLoggedMiddleware";
import hasLoggedMiddleware from "../../middleware/hasLoggedMiddleware";

const router = createBrowserRouter([
    {
        path: "/login",
        element: hasLoggedMiddleware(<Login />)
    },
    {
        path: "/kelolaadmin",
        element: checkLoggedMiddleware(<KelolaAdmin />)
    }
]);
export default router;

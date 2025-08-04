import { ReactNode, useContext } from "react";
import { verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

interface Props {
    children: ReactNode
}

function AdminRouteGuard({ children }: Props) {

    const isAdmin = useContext(UserContext)?.userDetails?.isAdmin;

    return verifyToken() && isAdmin ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default AdminRouteGuard;
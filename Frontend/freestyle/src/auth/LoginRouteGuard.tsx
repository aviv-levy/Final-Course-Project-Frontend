import { ReactNode } from "react";
import { verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

function LoginRouteGurard({ children }: Props) {
    return !verifyToken() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default LoginRouteGurard;
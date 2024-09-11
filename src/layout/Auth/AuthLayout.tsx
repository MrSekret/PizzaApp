import { Outlet } from "react-router-dom";
import cl from "./AuthLayout.module.css";

export function AuthLayout() {
    return (
        <div className={cl.layout}>
            <div className={cl.logo}></div>
            <div className={cl.content}>
                <Outlet />
            </div>
        </div>
    );
}

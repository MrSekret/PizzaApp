import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cl from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { loadProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();
    const { profileData, profileErrorMessage } = useSelector(
        (s: RootState) => s.user,
    );
    const items = useSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate("/auth/login");
    };
    return (
        <div className={cl["layout"]}>
            <div className={cl["sidebar"]}>
                <div className={cl["user"]}>
                    <img
                        src="./user.svg"
                        alt="avatar"
                        className={cl["avatar"]}
                    />
                    <div className={cl["name"]}>
                        {profileData ? profileData?.name : profileErrorMessage}
                    </div>
                    <div className={cl["email"]}>
                        {profileData && profileData?.email}
                    </div>
                </div>
                <div className={cl["menu"]}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(cl["link"], {
                                [cl.active]: isActive,
                            })
                        }
                    >
                        <img
                            src="./menu.svg"
                            alt="menu"
                            style={{ width: "20px" }}
                        />
                        Menu
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            cn(cl["link"], {
                                [cl.active]: isActive,
                            })
                        }
                    >
                        <img
                            src="./basket-gray.svg"
                            alt="basket"
                            style={{ width: "20px" }}
                        />
                        Basket{" "}
                        <span className={cl["cart-count"]}>
                            {items.reduce(
                                (acc, item) => (acc += item.count),
                                0,
                            )}
                        </span>
                    </NavLink>
                </div>
                <Button className={cl["exit"]} onClick={logout}>
                    <img
                        src="./exit.svg"
                        alt="quit"
                        style={{ width: "23px" }}
                        className={cl["quit"]}
                    />
                    Quit
                </Button>
            </div>
            <div className={cl["content"]}>
                <Outlet />
            </div>
        </div>
    );
}

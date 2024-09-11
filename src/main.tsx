import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Cart } from "./pages/Cart/Cart.tsx";
import { ErrorPage } from "./pages/Error/Error.tsx";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { Layout } from "./layout/Menu/Layout.tsx";
import { ProductInfo } from "./pages/Product/Product.tsx";
import { PREFIX } from "./helpers/API.ts";
import axios from "axios";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Success } from "./pages/Success/Succes.tsx";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <Menu />
                    </Suspense>
                ),
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/success",
                element: <Success />,
            },
            {
                path: "/product/:id",
                element: <ProductInfo />,
                errorElement: <>Error</>,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            axios
                                .get(`${PREFIX}/products/${params.id}`)
                                .then((data) => resolve(data))
                                .catch((e) => reject(e));
                        }),
                    });
                },
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);

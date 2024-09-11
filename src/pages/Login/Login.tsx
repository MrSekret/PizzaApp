import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Titlte";
import cl from "./Login.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Login() {
    const [, setError] = useState<string | null>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();
    const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        dispatch(userActions.clearProfileError());
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return (
        <div className={cl.wrapper}>
            <Title>Вход</Title>
            {loginErrorMessage && (
                <div className={cl.error}>Error {loginErrorMessage}</div>
            )}
            <form className={cl.form} onSubmit={submit}>
                <div className={cl.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" placeholder="Email" name="email" />
                </div>
                <div className={cl.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                    />
                </div>
                <Button appearence="big">Вход</Button>
            </form>
            <div className={cl.links}>
                <span>Нет аккаунта?</span>
                <Link to="/auth/register">Зарегистрироваться</Link>
            </div>
        </div>
    );
}

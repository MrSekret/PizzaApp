import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Titlte";
import cl from "../Login/Login.module.css";
import { register, userActions } from "../../store/user.slice";
import { FormEvent, useEffect, useState } from "react";
import { AppDispath, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
};

export function Register() {
    const [, setError] = useState<string | null>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(
            register({
                email: email.value,
                password: password.value,
                name: name.value,
            }),
        );
    };

    return (
        <div className={cl.wrapper}>
            <Title>Регистрация</Title>
            {registerErrorMessage && (
                <div className={cl.error}>Error {registerErrorMessage}</div>
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
                <div className={cl.field}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input id="name" placeholder="Имя" name="name" />
                </div>
                <Button appearence="big">Зарегистрироваться</Button>
            </form>
            <div className={cl.links}>
                <span>Есть акккаунт?</span>
                <Link to="/auth/login">Войти</Link>
            </div>
        </div>
    );
}

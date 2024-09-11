import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import Title from "../../components/Title/Titlte";
import Button from "../../components/Button/Button";
import cl from "./Product.module.css";
import { cartActions } from "../../store/cart.slice";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";

export function ProductInfo() {
    const data = useLoaderData() as { data: Product };
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();

    return (
        <Suspense fallback={"Loading..."}>
            <Await resolve={data.data}>
                {({ data }: { data: Product }) => {
                    const add = () => {
                        dispatch(cartActions.add(data.id));
                        navigate("/");
                    };
                    return (
                        <div className={cl.product}>
                            <div className={cl.header}>
                                <img
                                    src="../chevron-left-solid.svg"
                                    alt="back"
                                    style={{
                                        width: "16px",
                                        marginRight: "48px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate("/")}
                                />
                                <Title>{data.name}</Title>
                                <Button onClick={add} className={cl.button}>
                                    <img
                                        src="../basket.svg"
                                        alt="basket icon"
                                        className={cl.buttonImg}
                                    />
                                    В корзину
                                </Button>
                            </div>
                            <div className={cl.footer}>
                                <img
                                    src={data.image}
                                    alt="Product image"
                                    className={cl.img}
                                />
                                <div className={cl.textblock}>
                                    <div className={cl.price}>
                                        <span>Цена</span>
                                        <span>{data.price}$</span>
                                    </div>
                                    <div className={cl.rating}>
                                        <span>Рейтинг</span>
                                        <span>
                                            {data.rating}
                                            <img
                                                src="../star-solid.svg"
                                                alt="start icon"
                                                style={{ width: "16px" }}
                                            />
                                        </span>
                                    </div>
                                    <span className={cl.ingredients}>
                                        Состав
                                        <ul>
                                            {data.ingredients.map((e, ind) => (
                                                <li key={ind}>{e}</li>
                                            ))}
                                        </ul>
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Await>
        </Suspense>
    );
}

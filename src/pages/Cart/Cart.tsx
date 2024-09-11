import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title/Titlte";
import { AppDispath, RootState } from "../../store/store";
import CartItem from "../../components/cartItem/cartItem";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import { PREFIX } from "../../helpers/API";
import axios from "axios";
import cl from "./Cart.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispath>();

    const total = items
        .map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
                return 0;
            }
            return i.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadItems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setCartProducts(res);
    };

    const checkout = async () => {
        await axios.post(
            `${PREFIX}/order`,
            {
                products: items,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(cartActions.clean());
        navigate("/success");
    };

    useEffect(() => {
        loadItems();
    }, [items]);

    return (
        <>
            <Title className={cl["headLink"]}>Корзина</Title>
            {items.map((i) => {
                const product = cartProducts.find((p) => p.id === i.id);
                if (!product) {
                    return;
                }
                return (
                    <CartItem key={product.id} count={i.count} {...product} />
                );
            })}
            <div className={cl["line"]}>
                <div className={cl["text"]}>Итог</div>
                <div className={cl["price"]}>
                    {total}&nbsp;
                    <span>$</span>
                </div>
            </div>
            <hr className={cl["hr"]} />
            <div className={cl["line"]}>
                <div className={cl["text"]}>Доставка</div>
                <div className={cl["price"]}>
                    {total == 0 ? 0 : DELIVERY_FEE}&nbsp;
                    <span>$</span>
                </div>
            </div>
            <hr className={cl["hr"]} />
            <div className={cl["line"]}>
                <div className={cl["text"]}>
                    Итог{" "}
                    <span className={cl["total-count"]}>({items.length})</span>
                </div>
                <div className={cl["price"]}>
                    {total == 0 ? 0 : total + DELIVERY_FEE}
                    <span>$</span>
                </div>
            </div>
            <div className={cl["checkout"]}>
                <Button appearence="big" onClick={checkout}>
                    Оформить
                </Button>
            </div>
        </>
    );
}

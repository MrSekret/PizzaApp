import cl from "./cartItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { CartItemProps } from "./cartItem.props";

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispath>();

    const increase = () => {
        dispatch(cartActions.add(props.id));
    };
    const descrease = () => {
        dispatch(cartActions.remove(props.id));
    };
    const remove = () => {
        dispatch(cartActions.delete(props.id));
    };

    return (
        <div className={cl["item"]}>
            <div
                className={cl["image"]}
                style={{ backgroundImage: `url('${props.image}')` }}
            ></div>
            <div className={cl["description"]}>
                <div className={cl["name"]}>{props.name}</div>
                <div className={cl["price"]}>{props.price}&nbsp;$</div>
            </div>
            <div className={cl["actions"]}>
                <button className={cl["minus"]} onClick={descrease}>
                    <img src="./minus-solid.svg" alt="Удалить из корзины" />
                </button>
                <div className={cl["number"]}>{props.count}</div>
                <button className={cl["plus"]} onClick={increase}>
                    <img src="./plus-solid.svg" alt="Добавить в корзину" />
                </button>
                <button className={cl["xmark"]} onClick={remove}>
                    <img src="/xmark-solid.svg" alt="Добавить в корзину" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;

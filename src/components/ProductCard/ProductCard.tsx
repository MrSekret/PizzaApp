import { Link } from "react-router-dom";
import cl from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<AppDispath>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.add(props.id));
    };

    return (
        <Link to={`./product/${props.id}`}>
            <div className={cl["card"]}>
                <div
                    className={cl["head"]}
                    style={{ backgroundImage: `url('${props.img}')` }}
                >
                    <div className={cl["price"]}>
                        {props.price}&nbsp;
                        <span className={cl["currency-icon"]}>$</span>
                    </div>
                    <button className={cl["add-to-cart"]} onClick={add}>
                        <img src="./basket.svg" alt="Добавить в корзину" />
                    </button>
                    <div className={cl["rating"]}>
                        {props.rating}&nbsp;
                        <img
                            src="./star-solid.svg"
                            alt="star-icon"
                            className={cl["star-icon"]}
                        />
                    </div>
                </div>
                <div className={cl["footer"]}>
                    <h1 className={cl["title"]}>{props.name}</h1>
                    <p className={cl["description"]}>{props.description}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;

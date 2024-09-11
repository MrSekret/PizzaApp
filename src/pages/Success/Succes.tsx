import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import cl from "./Succes.module.css";

export function Success() {
    const navigate = useNavigate();

    return (
        <div className={cl.success}>
            <img src="./success.png" alt="Pizza" />
            <div className={cl.text}>Ваш заказ успешно оформлен</div>
            <Button appearence="big" onClick={() => navigate("/")}>
                Сделать новый
            </Button>
        </div>
    );
}

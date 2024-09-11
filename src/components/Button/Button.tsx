import cl from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({
    children,
    className,
    appearence = "small",
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(cl["button"], cl["accent"], className, {
                [cl["big"]]: appearence === "big",
                [cl["small"]]: appearence === "small",
            })}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;

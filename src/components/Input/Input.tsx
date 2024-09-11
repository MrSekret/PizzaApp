import { forwardRef } from "react";
import cl from "./Input.module.css";
import cn from "classnames";
import { InputProps } from "./Input.props";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, isValid = true, ...props },
    ref,
) {
    return (
        <input
            ref={ref}
            className={cn(className, cl["input"], {
                [cl["invalid"]]: !isValid,
            })}
            {...props}
        />
    );
});

export default Input;

import { forwardRef } from "react";
import cl from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from "classnames";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { placeholder, isValid, ...props },
    ref,
) {
    return (
        <div className={cl["input-wrapper"]}>
            <input
                placeholder={placeholder}
                ref={ref}
                className={cn(cl["input"], {
                    [cl["invalid"]]: isValid,
                })}
                {...props}
            />
            <img
                src="./search-glass.svg"
                alt="search icon"
                className={cl["img"]}
            />
        </div>
    );
});

export default Search;

import cl from "./Title.module.css";
import { TitleProps } from "./Title.props";

function Title({ children, ...props }: TitleProps) {
    return (
        <h1 className={cl["title"]} {...props}>
            {children}
        </h1>
    );
}

export default Title;

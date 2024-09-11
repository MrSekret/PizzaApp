import ProductCard from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
import cl from "./MenuList.module.css";

export function MenuList({ products }: MenuListProps) {
    return (
        <div className={cl.wrapper}>
            {products.map((p) => (
                <ProductCard
                    name={p.name}
                    description={p.ingredients.join(", ")}
                    rating={p.rating}
                    price={p.price}
                    img={p.image}
                    id={p.id}
                    key={p.id}
                />
            ))}
        </div>
    );
}

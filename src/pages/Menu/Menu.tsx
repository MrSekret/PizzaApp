import { ChangeEvent, useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Titlte";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import cl from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: { name },
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    return (
        <>
            <div className={cl["head"]}>
                <Title>Menu</Title>
                <Search
                    placeholder="Type a dish or composition"
                    isValid={true}
                    onChange={updateFilter}
                />
            </div>
            <div>
                {error && `Error while loading ${error}`}
                {!isLoading && products.length > 0 && (
                    <MenuList products={products} />
                )}
                {isLoading && "Loading products..."}
                {!isLoading && products.length === 0 && (
                    <>Не найдено по запросу</>
                )}
            </div>
        </>
    );
}

export default Menu;

import { useState, useEffect } from "react";

type ProductProps = {
    id: number;
    title: string;
    image: string;
    isLiked: boolean;
};

const useMainHook = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            try {
                const parsedProducts = JSON.parse(storedProducts);
                if (Array.isArray(parsedProducts)) {
                    setProducts(parsedProducts);
                }
            } catch (error) {
                console.error("Failed to parse products from localStorage:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    const handleDelete = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleLike = (id: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, isLiked: !p.isLiked } : p))
    };

    const handleAdd = (newProduct: Omit<ProductProps, 'id' | 'isLiked'>) => {
        setProducts([...products, { ...newProduct, id: products.length + 1, isLiked: false }]);
    };

    return { products, handleDelete, handleLike, handleAdd };
}

export default useMainHook;
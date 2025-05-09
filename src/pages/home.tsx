import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AddProductForm from "../components/AddProductForm";
import { ProductProps } from "../types/ProductProps";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductList from "../components/ProductList";
import { SetStateAction } from "react";

const Home = ({ products, handleDelete, handleLike, handleAdd }: { products: ProductProps[], setProducts: React.Dispatch<SetStateAction<ProductProps[]>>, handleDelete: (id: number) => void, handleLike: (id: number) => void, handleAdd: (product: Omit<ProductProps, 'id' | 'isLiked'>) => void }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({ title: "", image: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(products);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const toggleForm = () => setIsFormVisible(!isFormVisible);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAdd(formData);
        setFormData({ title: "", image: "" });
        setIsFormVisible(false);
    };

    const handleSearch = () => {
        const trimmedSearchValue = searchValue.trim().toLowerCase();

        if (!trimmedSearchValue) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(trimmedSearchValue)
        );

        setFilteredProducts(filtered);
    };

    return (
        <>
            <h1 className="md:text-3xl text-5xl font-extrabold text-gray-800 mb-5">Home</h1>
            {isLoading && filteredProducts.length === 0 && (
                <div className="p-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                </div>
            )}

            {isFormVisible && (<AddProductForm formData={formData} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} toggleForm={toggleForm} />)}

            {!isLoading && (
                <div className="flex flex-row items-center gap-3">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            )}
            <motion.div
                className="grid md:grid-flow-col grid-flow-row justify-center gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
                }}
            >
                {isLoading ? (<LoadingSkeleton />) : (
                    <ProductList products={filteredProducts} handleLike={handleLike} handleDelete={handleDelete} />
                )}
            </motion.div>

            <button
                onClick={toggleForm}
                className="fixed bottom-8 right-8 flex items-center p-4 text-white rounded-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 transition z-50"
            >
                <FontAwesomeIcon fill="white" className="text-2xl" icon={faPlus} />
            </button>
        </>
    );
};

export default Home;
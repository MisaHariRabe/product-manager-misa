import { ProductCard } from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductProps {
    id: number
    title: string
    image: string
    isLiked: boolean
}

const Home = ({ products, handleDelete, handleLike, handleAdd }: { products: ProductProps[], handleDelete: (id: number) => void, handleLike: (id: number) => void, handleAdd: (product: Omit<ProductProps, 'id' | 'isLiked'>) => void }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({ title: "", image: "" });

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

    return (
        <>
            <h1 className="md:text-3xl text-5xl font-extrabold text-gray-800 mb-5">Home</h1>
            {isFormVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 p-4 z-50"
                >
                    <form
                        onSubmit={handleFormSubmit}
                        className="bg-white shadow-md rounded-md p-6 w-96"
                    >
                        <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                Titre
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                                Lien de l'image
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="p-2 border border-gray-500 text-gray-500 rounded transition"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="p-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </motion.div>
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
                {products.length > 0
                    ? (products.map(
                        product => (
                            <motion.div
                                key={product.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    handleDelete={handleDelete}
                                    handleLike={handleLike}
                                />
                            </motion.div>
                        )
                    )) : (
                        <p className="p-4 text-gray-500 font-bold">Aucun produit n'a été trouvé !</p>
                    )
                }
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
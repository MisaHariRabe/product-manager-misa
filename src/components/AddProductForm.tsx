import { motion } from "framer-motion"
import { ProductProps } from "../types/ProductProps"

const AddProductForm = (
    {
        formData, handleInputChange, handleFormSubmit, toggleForm
    }: {
        formData: Omit<Omit<ProductProps, "id">, "isLiked">,
        handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        handleFormSubmit: (e: React.FormEvent) => void,
        toggleForm: () => void
    }
) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50"
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
    )
}

export default AddProductForm

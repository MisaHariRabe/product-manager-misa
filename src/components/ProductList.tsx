import { motion } from 'framer-motion'
import { ProductProps } from '../types/ProductProps'
import { ProductCard } from './ProductCard'

const ProductList = (
    {
        products,
        handleLike,
        handleDelete
    }: {
        products: ProductProps[],
        handleLike: (id: number) => void,
        handleDelete: (id: number) => void
    }
) => {
    return (
        products.length > 0
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
    )
}

export default ProductList

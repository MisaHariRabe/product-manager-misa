import { ProductCard } from "../components/ProductCard";

interface ProductProps {
    id: number
    title: string
    image: string
    isLiked: boolean
}

const Home = ({ products, handleDelete, handleLike }: { products: ProductProps[], handleDelete: (id: number) => void, handleLike: (id: number) => void }) => {
    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Home</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map(
                    product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            handleDelete={handleDelete}
                            handleLike={handleLike}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Home;

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFill, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ProductProps {
    id: number;
    title: string;
    image: string;
    isLiked: boolean;
}

const Product = ({ products, handleDelete, handleLike }: { products: ProductProps[], handleDelete: (id: number) => void, handleLike: (id: number) => void }) => {
    const { id } = useParams();
    const product: ProductProps | undefined = products.find(p => p.id === Number(id));
    const isLiked = product?.isLiked;

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <Link
                to={"/"}
                className="block text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200 mb-4 font-medium"
            >
                ← Go back home
            </Link>
            {
                product ? (
                    <>
                        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">{product.title}</h1>
                        <div
                            key={product.id}
                            className="border border-gray-300 p-6 rounded-lg flex flex-col md:flex-row gap-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                        >
                            <figure className="overflow-hidden w-full md:w-[500px] h-[300px] md:h-[500px] rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="block w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </figure>
                            <div className="flex flex-col justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{product.title}</h2>
                                <div className="flex items-center mt-4 space-x-4">
                                    <FontAwesomeIcon
                                        color="green"
                                        icon={isLiked ? faHeartFill : faHeartOutline}
                                        onClick={() => handleLike(product.id)}
                                        className="text-3xl hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                                    />
                                    <FontAwesomeIcon
                                        color="red"
                                        icon={faTrash}
                                        onClick={() => handleDelete(product.id)}
                                        className="text-3xl hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-lg font-bold mb-4 text-red-500">Aucun produit trouvé</h1>
                    </>
                )
            }
        </div>
    );
};

export default Product;

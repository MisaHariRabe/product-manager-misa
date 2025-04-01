import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFill, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ProductProps {
    id: number;
    title: string;
    image: string;
    isLiked: boolean;
}

export const ProductCard = (
    { product, handleDelete, handleLike }: { product: ProductProps, handleDelete: (id: number) => void, handleLike: (id: number) => void }
) => {
    const isLiked = product.isLiked;

    return (
        <div
            key={product.id}
            className="border border-gray-300 p-4 rounded-lg flex flex-row gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
        >
            <figure className="overflow-hidden w-[200px] h-[200px] rounded-lg">
                <img
                    src={product.image}
                    alt={product.title}
                    className="block w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </figure>
            <div className="flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <FontAwesomeIcon
                            color="green"
                            icon={isLiked ? faHeartFill : faHeartOutline}
                            onClick={() => handleLike(product.id)}
                            className="text-2xl hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                        />
                        <FontAwesomeIcon
                            color="red"
                            icon={faTrash}
                            onClick={() => handleDelete(product.id)}
                            className="text-2xl px-4 py-2 hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                        />
                    </div>
                    <Link
                        to={"/product/" + product.id}
                        className="block text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};
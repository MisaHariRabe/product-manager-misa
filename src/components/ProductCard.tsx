import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFill } from "@fortawesome/free-solid-svg-icons";

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
            className="border border-gray-300 p-4 rounded-lg flex flex-col gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-[300px]"
        >
            <figure className="overflow-hidden w-full h-[200px] rounded-lg">
                <img
                    src={product.image}
                    alt={product.title}
                    className="block w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </figure>
            <div className="flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon
                            color="lightgreen"
                            icon={isLiked ? faHeartFill : faHeartOutline}
                            onClick={() => handleLike(product.id)}
                            className="md:text-2xl text-3xl hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                        />
                        <FontAwesomeIcon
                            color="red"
                            icon={faTrashCan}
                            onClick={() => handleDelete(product.id)}
                            className="md:text-2xl text-3xl px-4 py-2 hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                        />
                    </div>
                    <Link
                        to={"/product/" + product.id}
                        className="block text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2 border border-blue-500 rounded"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};
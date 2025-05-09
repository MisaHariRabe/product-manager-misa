const LoadingSkeleton = () => {
    return (
        Array.from({ length: 4 }).map((_, index) => (
            <div
                key={index}
                className="w-[300px] h-80 bg-gray-300 animate-pulse rounded-md"
            ></div>
        ))
    )
}

export default LoadingSkeleton

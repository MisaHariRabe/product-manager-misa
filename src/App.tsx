import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";

interface ProductProps {
  id: number;
  title: string;
  image: string;
  isLiked: boolean;
}

const App = () => {
  const [products, setProducts] = useState<ProductProps[]>([
    {
      id: 1,
      title: "Smartphone Premium",
      image: "https://images.frandroid.com/wp-content/uploads/2025/02/xiaomi-15-ultra-test-2-scaled.jpg",
      isLiked: false,
    },
    {
      id: 2,
      title: "Laptop Ultrabook",
      image: "https://cdn.thewirecutter.com/wp-content/media/2024/07/windowsultrabooks-2048px-3640.jpg?auto=webp&quality=75&width=1024",
      isLiked: true,
    },
    {
      id: 3,
      title: "Wireless Headphones",
      image: "https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-6146.jpg?auto=webp&quality=75&width=1024",
      isLiked: false,
    },
    {
      id: 4,
      title: "Smart Watch",
      image: "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg",
      isLiked: false,
    },
    {
      id: 5,
      title: "Digital Camera",
      image: "https://filmcamerastore.co.uk/cdn/shop/files/retro-pink-compact-digital-camera-digicam-1.png?v=1689277087&width=1406",
      isLiked: true,
    },
    {
      id: 6,
      title: "Gaming Console",
      image: "https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00651-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024",
      isLiked: false,
    }
  ]);

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleLike = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, isLiked: !p.isLiked } : p))
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} handleDelete={handleDelete} handleLike={handleLike} />} />
        <Route path="/product/:id" element={<Product products={products} handleDelete={handleDelete} handleLike={handleLike} />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";

import SmartphonePremium from "./assets/images/xiaomi-15-ultra-test-2-scaled.webp"
import LaptopUltrabook from "./assets/images/windowsultrabooks-2048px-3640.webp"
import WirelessHeaphones from "./assets/images/bluetoothheadphones-2048px-6146.webp"
import SmartWatch from "./assets/images/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg"
import DigitalCamera from "./assets/images/retro-pink-compact-digital-camera-digicam-1.webp"
import GamingConsole from "./assets/images/gamingconsoles-2048px-00651-3x2-1.webp"

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
      image: SmartphonePremium,
      isLiked: false,
    },
    {
      id: 2,
      title: "Laptop Ultrabook",
      image: LaptopUltrabook,
      isLiked: true,
    },
    {
      id: 3,
      title: "Wireless Headphones",
      image: WirelessHeaphones,
      isLiked: false,
    },
    {
      id: 4,
      title: "Smart Watch",
      image: SmartWatch,
      isLiked: false,
    },
    {
      id: 5,
      title: "Digital Camera",
      image: DigitalCamera,
      isLiked: true,
    },
    {
      id: 6,
      title: "Gaming Console",
      image: GamingConsole,
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

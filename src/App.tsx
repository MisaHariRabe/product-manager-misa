import { useState, useEffect } from "react";
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
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        }
      } catch (error) {
        console.error("Failed to parse products from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleLike = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, isLiked: !p.isLiked } : p))
  };

  const handleAdd = (newProduct: Omit<ProductProps, 'id' | 'isLiked'>) => {
    setProducts([...products, { ...newProduct, id: products.length + 1, isLiked: false }]);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<Home products={products} handleDelete={handleDelete} handleLike={handleLike} handleAdd={handleAdd} />} />
          <Route path="/product/:id" element={<Product products={products} handleDelete={handleDelete} handleLike={handleLike} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

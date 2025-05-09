import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import LoginPage from "./pages/login";
import useMainHook from "./hooks/useMainHook";

const App = () => {
  const { products, setProducts, handleDelete, handleLike, handleAdd } = useMainHook();

  return (
    <div className="p-4 bg-gray-50 min-h-[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} index />
          <Route path="/home" element={<Home products={products} setProducts={setProducts} handleDelete={handleDelete} handleLike={handleLike} handleAdd={handleAdd} />} />
          <Route path="/product/:id" element={<Product products={products} handleDelete={handleDelete} handleLike={handleLike} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

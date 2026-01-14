import { useState, useEffect } from "react";
import localforage from "localforage";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const ADMIN_PASSWORD = "Jayden"; 

 
  useEffect(() => {
    async function loadProducts() {
      const savedProducts = await localforage.getItem("products");
      if (savedProducts) setProducts(savedProducts);
    }
    loadProducts();
  }, []);

  
  useEffect(() => {
    localforage.setItem("products", products);
  }, [products]);

 
  function addProduct(product) {
    setProducts([...products, { ...product, id: Date.now() }]);
  }


  function deleteProduct(id) {
    setProducts(products.filter((p) => p.id !== id));
  }


  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      setShowLoginModal(false);
      setPasswordInput("");
    } else {
      alert("Incorrect password");
    }
  }

  function handleLogout() {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    alert("Logged out. You are now in client mode.");
  }

  useEffect(() => {
    const savedAdmin = localStorage.getItem("isAdmin");
    if (savedAdmin === "true") setIsAdmin(true);
  }, []);

  return (
    <div className="app-container">
      <h1>360visionHub</h1>

      <div className="admin-buttons">
        {!isAdmin ? (
          <button
            className="admin-login"
            onClick={() => setShowLoginModal(true)}
          >
            Admin Login
          </button>
        ) : (
          <button className="admin-logout" onClick={handleLogout}>
            Admin Logout
          </button>
        )}
      </div>

   
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Admin Login</h3>
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleLogin}>Login</button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setPasswordInput("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {isAdmin && <AddProduct addProduct={addProduct} />}

      <ProductList
        products={products}
        readOnly={!isAdmin}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

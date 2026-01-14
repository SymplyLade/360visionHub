import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import "./App.css";
import hardcodedProducts from "./products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [contact, setContact] = useState({
    phone: "07065692621",
    whatsapp: "08101821300",
    social: "@360visionhub",
    email: "360visionhub@gmail.com",
    address: "Igodo Road, opposite Abis Hotel, Magboro, Ogun State, Nigeria"
  });

  const ADMIN_PASSWORD = "Jayden";

  
  useEffect(() => {
    setProducts(hardcodedProducts);

    const savedContact = localStorage.getItem("contact");
    if (savedContact) setContact(JSON.parse(savedContact));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contact));
  }, [contact]);


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
      alert("Admin mode activated!");
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

    
      <header className="app-header">
        <h1>360visionHub</h1>
        <div className="services">
          <h2>Our Services</h2>
          <p>
            We specialize in: Blends, Braids, Ghana Weaving, Revamping, Twisting,
            Hair Installation, Styling and Straightening, Lace Replacement,
            Cornrows, Hair Dye, Pedicure, and Manicure.
          </p>
        </div>
      </header>

     
      <section className="contact-section">
        <h2>Contact Us</h2>
        {isAdmin ? (
          <div className="contact-admin">
            <input
              type="text"
              placeholder="Phone number"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="WhatsApp number"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
            />
            <input
              type="text"
              placeholder="Instagram / TikTok handle"
              value={contact.social}
              onChange={(e) => setContact({ ...contact, social: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email / Inbox"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
            />
          </div>
        ) : (
          <div className="contact-client">
            {contact.phone && <p>📞 Phone: {contact.phone}</p>}
            {contact.whatsapp && (
              <p>
                💬 WhatsApp:{" "}
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.whatsapp}
                </a>
              </p>
            )}
            {contact.social && (
              <p>
                📸 Instagram/TikTok:{" "}
                <a
                  href={`https://www.instagram.com/${contact.social.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.social}
                </a>
              </p>
            )}
            {contact.email && (
              <p>
                📧 Inbox:{" "}
                <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
                  {contact.email}
                </a>
              </p>
            )}
            {contact.address && <p>🏠 Address: {contact.address}</p>}
          </div>
        )}
      </section>

  
      <div className="admin-buttons">
        {!isAdmin ? (
          <button className="admin-login" onClick={() => setShowLoginModal(true)}>
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

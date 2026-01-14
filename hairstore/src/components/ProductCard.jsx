
export default function ProductCard({ product, readOnly = false, deleteProduct }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₦{product.price}</p>
      {!readOnly && (
        <button className="delete-button" onClick={() => deleteProduct(product.id)}>
          Delete
        </button>
      )}
    </div>
  );
}

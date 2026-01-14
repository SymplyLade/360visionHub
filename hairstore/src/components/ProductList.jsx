import ProductCard from "./ProductCard";

export default function ProductList({ products, readOnly = false, deleteProduct }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          readOnly={readOnly}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
}

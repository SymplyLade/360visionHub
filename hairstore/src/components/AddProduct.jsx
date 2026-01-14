import { useState } from "react";

export default function AddProduct({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 300;
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setImage(resizedBase64);
      };
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    addProduct({ name, price: Number(price), image });
    setName("");
    setPrice("");
    setImage(null);
    document.getElementById("imageInput").value = "";
  }

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h3>Add Product</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {image && <img className="preview-image" src={image} alt="Preview" />}
      <button type="submit">Add Product</button>
    </form>
  );
}

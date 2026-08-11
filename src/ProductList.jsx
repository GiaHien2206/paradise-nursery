import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  {
    id: 1,
    name: "Snake Plant",
    price: 15,
    category: "Air Purifying Plants",
    description: "A hardy indoor plant that helps purify the air.",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Peace Lily",
    price: 18,
    category: "Air Purifying Plants",
    description: "An elegant plant known for its white flowers.",
    image:
      "https://images.unsplash.com/photo-1614594575810-0507897a72c1?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Aloe Vera",
    price: 12,
    category: "Medicinal Plants",
    description: "A useful succulent known for its soothing gel.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Lavender",
    price: 20,
    category: "Medicinal Plants",
    description: "A fragrant plant commonly used for relaxation.",
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Monstera",
    price: 25,
    category: "Indoor Plants",
    description: "A tropical indoor plant with beautiful split leaves.",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "ZZ Plant",
    price: 22,
    category: "Indoor Plants",
    description: "A low-maintenance indoor plant perfect for beginners.",
    image:
      "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=500&q=80",
  },
];

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [addedItems, setAddedItems] = useState([]);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedItems((previousItems) => [
      ...previousItems,
      plant.id,
    ]);
  };

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="product-list-page">
      <header className="product-header">
        <div className="logo">
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="#plants">Plants</a>
          <a href="/cart">
            🛒 Cart ({totalCartQuantity})
          </a>
        </nav>
      </header>

      <main id="plants">
        <h1>Our Plants</h1>

        {categories.map((category) => (
          <section
            className="plant-category"
            key={category}
          >
            <h2>{category}</h2>

            <div className="plant-grid">
              {plants
                .filter(
                  (plant) =>
                    plant.category === category
                )
                .map((plant) => (
                  <div
                    className="plant-card"
                    key={plant.id}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                    />

                    <h3>{plant.name}</h3>

                    <p>{plant.description}</p>

                    <p className="price">
                      ${plant.price}
                    </p>

                    <button
                      onClick={() =>
                        handleAddToCart(plant)
                      }
                      disabled={addedItems.includes(
                        plant.id
                      )}
                    >
                      {addedItems.includes(plant.id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;

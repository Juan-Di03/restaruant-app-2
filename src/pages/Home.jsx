import React, { useEffect, useState } from "react";
import { getRestaurants } from "../services/FirebaseRestaurantService";
import RestaurantCard from "../UX/RestaurantCard";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError("Error cargando restaurantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando restaurantes...</p>;
  if (error) return <p>{error}</p>;
  if (restaurants.length === 0) return <p>No hay restaurantes disponibles.</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Restaurantes</h1>
      <div className="row">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Home;






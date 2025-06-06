import React, { useState, useEffect } from "react";
import RestaurantCard from "../UX/RestaurantCard";
import { searchRestaurantsByName } from "../services/FirebaseRestaurantService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        searchRestaurantsByName(query.trim())
          .then((data) => setResults(data))
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500); // debounce de medio segundo

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="container mt-4">
      <h1>Búsqueda de Restaurantes</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Cargando resultados...</p>}

      <div className="row">
        {!loading && results.length === 0 && query.trim() !== "" && (
          <p>No se encontraron resultados.</p>
        )}

        {results.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Search;






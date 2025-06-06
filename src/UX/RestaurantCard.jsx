// src/UX/RestaurantCard.jsx
import React, { useState } from "react";
import "./RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card h-100 shadow-sm">
          <img
            src={restaurant.image || "https://via.placeholder.com/300x200"}
            className="card-img-top"
            alt={restaurant.name}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{restaurant.name}</h5>
            <p className="card-text">{restaurant.description}</p>
            <div className="mt-auto text-end">
              <button onClick={handleToggle} className="btn btn-outline-warning btn-sm ver-mas-btn">
                Ver más
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="expanded-overlay" onClick={handleToggle}>
          <div
            className="expanded-card card shadow"
            onClick={(e) => e.stopPropagation()} // evita cerrar al dar clic dentro
          >
            <img
              src={restaurant.image || "https://via.placeholder.com/300x200"}
              className="card-img-top"
              alt={restaurant.name}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{restaurant.name}</h5>
              <p className="card-text">{restaurant.description}</p>
              <p className="card-text">
                <strong>Dirección:</strong> {restaurant.address}
              </p>
              <div className="mt-auto d-flex justify-content-start gap-2 flex-wrap">
                <a
                  href={restaurant.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-warning btn-sm"
                >
                  Ir al restaurante
                </a>
                <button onClick={handleToggle} className="btn btn-outline-warning btn-sm ver-mas-btn">
                  Ver menos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantCard;








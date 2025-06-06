import React from 'react';
import { useParams } from 'react-router-dom';
import { restaurantsData } from '../data';

const RestaurantDetail = () => {
  const { id } = useParams();
  const allRestaurants = [
    ...restaurantsData,
    ...(JSON.parse(localStorage.getItem('restaurantes')) || [])
  ];

  const restaurant = allRestaurants.find(r => r.link === `/restaurant/${id}`);

  if (!restaurant) {
    return <div className="container mt-5">Restaurante no encontrado</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{restaurant.name}</h1>
      <img 
        src={restaurant.image} 
        alt={restaurant.name} 
        className="img-fluid mb-4" 
        style={{ maxHeight: '400px', objectFit: 'cover' }}
      />
      <p><strong>Descripcion:</strong> {restaurant.description}</p>
      <p><strong>Dirección:</strong> {restaurant.address}</p>
    </div>
  );
};

export default RestaurantDetail;

// Servicio para manejar operaciones relacionadas con restaurantes

// Función que nos permite generar ID únicos
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);  
};

// Obtenemos restaurantes desde el localStorage
export const getRestaurants = async () => { 
  try {
    const savedRestaurants = localStorage.getItem('restaurants');
    if (savedRestaurants) {
      return JSON.parse(savedRestaurants);
    }
    // Si no hay restaurantes en localStorage, inicializar con datos de ejemplo
    const initialRestaurants = getInitialRestaurants();
    localStorage.setItem('restaurants', JSON.stringify(initialRestaurants));
    return initialRestaurants;
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    return [];
  }
};

// Listar un restaurante por ID
export const getRestaurantById = async (id) => {   
  try {
    const restaurants = await getRestaurants();
    return restaurants.find(restaurant => restaurant.id === id) || null;  
  } catch (error) {
    console.error('Error al buscar restaurante:', error);
    return null;
  }
};


// Crea un nuevo restaurante
export const addRestaurant = async (restaurantData) => {
  try {
    const restaurants = await getRestaurants();
    const newRestaurant = {
      ...restaurantData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    
    restaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    return newRestaurant;
  } catch (error) {
    console.error('Error al añadir restaurante:', error);
    throw error;
  }
};

// Actualiza un restaurate existente
export const updateRestaurant = async (id, updatedData) => {
  try {
    const restaurants = await getRestaurants();
    const index = restaurants.findIndex(restaurant => restaurant.id === id);
    
    if (index === -1) {
      throw new Error('Restaurante no encontrado');
    }
    
    const updatedRestaurant = {
      ...restaurants[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    restaurants[index] = updatedRestaurant;
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    return updatedRestaurant;
  } catch (error) {
    console.error('Error al actualizar restaurante:', error);
    throw error;
  }
};

// Eliminar un restaurante
export const deleteRestaurant = async (id) => {
  try {
    const restaurants = await getRestaurants();
    const filteredRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    
    localStorage.setItem('restaurants', JSON.stringify(filteredRestaurants));
    return true;
  } catch (error) {
    console.error('Error al eliminar restaurante:', error);
    throw error;
  }
};


const getInitialRestaurants = () => {
  return [
    {
    id: 1,
    name: "Tamagochi Ramen bar",
    description: "Restaurante de ramen y comida japonesa en Medellin, Colombia",
    address: "Carrera 43B No. 10 - 12 (segundo piso), Medellín, Antioquia",
    image: "https://lh3.googleusercontent.com/p/AF1QipNEF9H8F-esuvtonTRkEmLazypTPEv8xFjEFObk=s1600-w640",
    link: "https://www.instagram.com/tamagotchi_ramen_bar/?hl=es"
  },
  {
    id: 2,
    name: "Sushi Gama",
    description: "Restaurante de ramen y comida japonesa en Medellin, Colombia",
    address: "Calle 11A#43F-5, Medellín, Antioquia",
    image: "https://tofuu.getjusto.com/orioneat-local/resized2/2PDDPRMto6Y7FH2HB-360-x.webp",
    link: "https://www.sushigama.com/"
  },
  {
    id: 3,
    name: "Ichiraku Ramen bar",
    description: "Restaurante de ramen y comida japonesa ambientado en el anime de Naruto en Medellin, Colombia",
    address: "Carrera 37 #8a-11 | El Poblado",
    image: "https://scontent.feoh1-1.fna.fbcdn.net/v/t1.6435-9/89357313_514932279225677_8612905709186580480_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=-NExX98D-OIQ7kNvwEe3K_T&_nc_oc=AdnJCqJ2nQyN7vazjXpiDEw2cTUQ_Ga5J3BzIvPESfUgppy39i3mRmkXalTSjWKfx1g&_nc_zt=23&_nc_ht=scontent.feoh1-1.fna&_nc_gid=DpUkytL0mIXNaVN8TBMXHw&oh=00_AfPQoAk2JzOYXkIy4oP2BFvSmXLSuK3WHwqW2OekhGbI7Q&oe=68684EB9",
    link: "https://www.instagram.com/ichirakuramen_medellin/?hl=es"
  }
];
};
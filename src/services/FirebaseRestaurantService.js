import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseFirestore } from "../firebase/config";

const COLLECTION_NAME = "restaurants";

let initializing = false;
let initializedRestaurants = null;

export const getRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(FirebaseFirestore, COLLECTION_NAME));
    let restaurants = [];

    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (restaurants.length === 0) {
      if (initializing) {
        while (initializing) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        return initializedRestaurants;
      }

      initializing = true;
      initializedRestaurants = await initializeRestaurants();
      initializing = false;
      return initializedRestaurants;
    }

    return restaurants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    throw error;
  }
};

export const addRestaurant = async (restaurantData) => {
  try {
    const docRef = await addDoc(collection(FirebaseFirestore, COLLECTION_NAME), {
      ...restaurantData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar restaurante:", error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Restaurante no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener restaurante:", error);
    throw error;
  }
};

export const updateRestaurant = async (id, data) => {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error al actualizar restaurante:", error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar restaurante:", error);
    throw error;
  }
};

export const searchRestaurantsByName = async (name) => {
  try {
    const allRestaurants = await getRestaurants();
    return allRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(name.toLowerCase())
    );
  } catch (error) {
    console.error("Error al buscar restaurantes:", error);
    return [];
  }
};

// Inicializar con tus restaurantes originales
const initializeRestaurants = async () => {
  const defaultData = [
    {
      name: "Tamagochi Ramen bar",
      description: "Restaurante de ramen y comida japonesa en Medellin, Colombia",
      address: "Carrera 43B No. 10 - 12 (segundo piso), Medellín, Antioquia",
      image: "https://lh3.googleusercontent.com/p/AF1QipNEF9H8F-esuvtonTRkEmLazypTPEv8xFjEFObk=s1600-w640",
      link: "https://www.instagram.com/tamagotchi_ramen_bar/?hl=es",
      createdAt: new Date().toISOString(),
    },
    {
      name: "Sushi Gama",
      description: "Restaurante de ramen y comida japonesa en Medellin, Colombia",
      address: "Calle 11A#43F-5, Medellín, Antioquia",
      image: "https://tofuu.getjusto.com/orioneat-local/resized2/2PDDPRMto6Y7FH2HB-360-x.webp",
      link: "https://www.sushigama.com/",
      createdAt: new Date().toISOString(),
    },
    {
      name: "Ichiraku Ramen bar",
      description: "Restaurante de ramen y comida japonesa ambientado en el anime de Naruto en Medellin, Colombia",
      address: "Carrera 37 #8a-11 | El Poblado",
      image: "https://scontent.feoh1-1.fna.fbcdn.net/v/t1.6435-9/89357313_514932279225677_8612905709186580480_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=-NExX98D-OIQ7kNvwEe3K_T&_nc_oc=AdnJCqJ2nQyN7vazjXpiDEw2cTUQ_Ga5J3BzIvPESfUgppy39i3mRmkXalTSjWKfx1g&_nc_zt=23&_nc_ht=scontent.feoh1-1.fna&_nc_gid=DpUkytL0mIXNaVN8TBMXHw&oh=00_AfPQoAk2JzOYXkIy4oP2BFvSmXLSuK3WHwqW2OekhGbI7Q&oe=68684EB9",
      link: "https://www.instagram.com/ichirakuramen_medellin/?hl=es",
      createdAt: new Date().toISOString(),
    },
  ];

  const added = await Promise.all(
    defaultData.map(async (restaurant) => {
      const docRef = await addDoc(collection(FirebaseFirestore, COLLECTION_NAME), restaurant);
      return { id: docRef.id, ...restaurant };
    })
  );

  console.log("Restaurantes inicializados correctamente");
  return added;
};







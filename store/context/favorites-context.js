import { createContext, useState } from "react";

export const FavoritesContext = createContext();

function FavoritesContextProvider({ children }) {
  const [favoriteMealId, setFavoriteMealId] = useState([]);

  function addFavorites(id) {
    setFavoriteMealId((prev) => [...prev, id]);
  }

  function removeFavorites(id) {
    setFavoriteMealId((prev) => prev.filter((prevId) => prevId !== id));
  }

  const value = {
    ids: favoriteMealId,
    addFavorites,
    removeFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;

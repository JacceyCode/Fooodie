import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
// import { useSelector } from "react-redux";

function FavoritesScreen() {
  const { ids } = useContext(FavoritesContext);

  ///////////////////////
  // Using Redux
  // const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  const favoriteMeal = MEALS.filter((meal) => ids.includes(meal.id));
  // const favoriteMeal = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

  if (favoriteMeal.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meal yet.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeal} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

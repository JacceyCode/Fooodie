import { useContext, useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
// import { addFavorite, removeFavorite } from "../store/redux/favorite";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  ////////////////////////////////////////////
  // Using context API
  const { ids, addFavorites, removeFavorites } = useContext(FavoritesContext);
  const mealIsFavorite = ids.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    mealIsFavorite ? removeFavorites(mealId) : addFavorites(mealId);
  };

  ///////////////////////////////
  // Using Redux Tollkit
  // const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  // const dispatch = useDispatch();

  // const mealIsFavorite = favoriteMealIds.includes(mealId);

  // const changeFavoriteStatusHandler = () => {
  //   mealIsFavorite
  //     ? dispatch(removeFavorite({ id: mealId }))
  //     : dispatch(addFavorite({ id: mealId }));
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOutContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOutContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

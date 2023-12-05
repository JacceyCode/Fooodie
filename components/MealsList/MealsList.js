import { FlatList, StyleSheet, View } from "react-native";

import MealItem from "./MealItem";

function MealsList({ items }) {
  const renderMealItem = (itemData) => {
    const { item } = itemData;
    return <MealItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

import { View, FlatList, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { useData } from "@/app/context/Context";



function Categories() {
  const [selectedItem, setSelectedItem,] = useState<number>(0);
  const { setCategory, categories } = useData();

  return (
    <View style={styles.categories}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <Text
            style={[
              styles.category,
              selectedItem === index ? styles.active : null,
            ]}
            onPress={() => {
              
              setSelectedItem(index);
              setCategory(item);
            }}
          >
            {item}
          </Text>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categories: {
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  category: {
    marginRight: 10,
    fontSize: 16,
    color: "black",
    textTransform: 'capitalize',
  },
  active: {
    color: Colors.light.colorPink,
    borderBottomColor: Colors.light.colorPink,
    borderBottomWidth: 2,
   
  
  },
});

export default Categories;

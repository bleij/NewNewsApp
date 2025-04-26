import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '~/context/FavouritesContext';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
});

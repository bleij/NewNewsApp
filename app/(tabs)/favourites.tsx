import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '~/context/FavouritesContext';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  const handlePress = (articleId: number) => {
    router.push(`/article?id=${articleId}`);
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
  card: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
});

import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getArticle } from '../api/newsApi';
import { useFavorites } from '~/context/FavouritesContext';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<{ id: number; title: string; content: string } | null>(
    null
  );
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    if (id) {
      getArticle(Number(id)).then(setArticle);
    }
  }, [id]);

  if (!article) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const isFavorite = favorites.some((fav) => fav.id === article.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.content}>{article.content}</Text>
      </View>
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleFavoriteToggle}
        color={isFavorite ? '#ff4d4d' : '#4CAF50'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});

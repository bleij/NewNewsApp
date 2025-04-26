import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { getArticle } from '../api/newsApi';
import { useFavorites } from "~/context/FavouritesContext";

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState(null);
  const { addToFavorites } = useFavorites();

  useEffect(() => {
    getArticle(Number(id)).then(setArticle);
  }, [id]);

  if (!article) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text>{article.content}</Text>
      <Button title="Add to Favorites" onPress={() => addToFavorites(article)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

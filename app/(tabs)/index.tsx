import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Button, StyleSheet } from 'react-native';
import { getNews } from '../api/newsApi';

export default function HomeScreen() {
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getNews().then(setNews);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Button title="View Article" onPress={() => router.push(`/article?id=${item.id}`)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
});

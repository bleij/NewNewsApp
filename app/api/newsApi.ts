import axios from 'axios';

const API_KEY = 'f010d3775faa4d029ad050005a02d115';

const BASE_URL = 'https://newsapi.org/v2';

export async function getNews() {
  const { data } = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'us',
      apiKey: API_KEY,
    },
  });

  return data.articles.map((article: any, index: number) => ({
    id: index,
    title: article.title,
    content: article.content || article.description || '',
  }));
}

export async function getArticle(id: number) {
  const news = await getNews();
  return news[id];
}

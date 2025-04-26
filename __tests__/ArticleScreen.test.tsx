import { render, screen } from '@testing-library/react-native';
import ArticleScreen from '~/app/(tabs)';
import { FavoritesProvider } from '~/context/FavouritesContext';
import { getArticle } from '~/app/api/newsApi';
import { useLocalSearchParams } from 'expo-router';

jest.mock('~/app/api/newsApi', () => ({
  getArticle: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

describe('ArticleScreen', () => {
  it('renders article content', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 1 });
    (getArticle as jest.Mock).mockResolvedValueOnce({
      id: 1,
      title: 'Sample Article',
      content: 'Sample Content',
    });

    render(
      <FavoritesProvider>
        <ArticleScreen />
      </FavoritesProvider>
    );

    expect(await screen.findByText('Sample Article')).toBeTruthy();
    expect(await screen.findByText('Sample Content')).toBeTruthy();
  });
});

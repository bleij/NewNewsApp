import { render, screen } from '@testing-library/react-native';
import FavoritesScreen from '~/app/(tabs)';
import { FavoritesProvider } from '~/context/FavouritesContext';

describe('FavoritesScreen', () => {
  it('shows empty message when no favorites', () => {
    render(
      <FavoritesProvider>
        <FavoritesScreen />
      </FavoritesProvider>
    );

    expect(screen.getByText('No favorites yet')).toBeTruthy();
  });

  it('shows favorite article when exists', () => {
    const mockFavorites = [{ id: 1, title: 'Favorite News', content: 'Some content' }];

    render(
      <FavoritesProvider
        value={{
          favorites: mockFavorites,
          addToFavorites: jest.fn(),
          removeFromFavorites: jest.fn(),
        }}>
        <FavoritesScreen />
      </FavoritesProvider>
    );

    expect(screen.getByText('Favorite News')).toBeTruthy();
  });
});

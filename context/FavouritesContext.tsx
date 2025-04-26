import { createContext, useContext, useState, ReactNode } from 'react';

type Article = {
  id: number;
  title: string;
  content: string;
};

type FavoritesContextType = {
  favorites: Article[];
  addToFavorites: (article: Article) => void;
  removeFromFavorites: (article: Article) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Article[]>([]);

  function addToFavorites(article: Article) {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === article.id);
      if (exists) {
        return prevFavorites;
      }
      return [...prevFavorites, article];
    });
  }

  const removeFromFavorites = (articleId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== articleId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

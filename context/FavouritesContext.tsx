import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Article {
  id: number;
  title: string;
  content: string;
}

interface FavoritesContextType {
  favorites: Article[];
  addToFavorites: (article: Article) => void;
  removeFromFavorites: (articleId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Article[]>([]);

  const FAVORITES_STORAGE_KEY = 'FAVORITES_STORAGE_KEY';

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const addToFavorites = (article: Article) => {
    setFavorites((prevFavorites) => {
      const alreadyExists = prevFavorites.some((item) => item.id === article.id);
      if (alreadyExists) {
        return prevFavorites;
      }
      return [...prevFavorites, article];
    });
  };

  const removeFromFavorites = (articleId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== articleId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

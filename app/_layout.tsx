import { Slot } from 'expo-router';

import { FavoritesProvider } from "~/context/FavouritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Slot />
    </FavoritesProvider>
  );
}

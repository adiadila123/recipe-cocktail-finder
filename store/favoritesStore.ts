// store/favoritesStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteItem {
  id: string
  type: 'meal' | 'cocktail'
  name: string
  image: string
  category: string
}

interface FavoritesStore {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string, type: 'meal' | 'cocktail') => void
  isFavorite: (id: string, type: 'meal' | 'cocktail') => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (item) =>
        set((state) => ({
          favorites: [...state.favorites, item],
        })),
      removeFavorite: (id, type) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => !(fav.id === id && fav.type === type)
          ),
        })),
      isFavorite: (id, type) => {
        const { favorites } = get()
        return favorites.some((fav) => fav.id === id && fav.type === type)
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
)
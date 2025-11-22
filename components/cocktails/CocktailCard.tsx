// components/cocktails/CocktailCard.tsx
'use client'

import Link from 'next/link'
import { Heart, GlassWater, Clock } from 'lucide-react'
import { Cocktail } from '@/lib/types/cocktail'
import { useFavoritesStore } from '@/store/favoritesStore'

interface CocktailCardProps {
  cocktail: Cocktail
}

export function CocktailCard({ cocktail }: CocktailCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()

  const isFav = isFavorite(cocktail.idDrink, 'cocktail')

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFav) {
      removeFavorite(cocktail.idDrink, 'cocktail')
    } else {
      addFavorite({
        id: cocktail.idDrink,
        type: 'cocktail',
        name: cocktail.strDrink,
        image: cocktail.strDrinkThumb,
        category: cocktail.strCategory,
      })
    }
  }

  return (
    <Link href={`/cocktails/${cocktail.idDrink}`}>
      <div className="card group h-full overflow-hidden hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
          >
            <Heart
              className={`w-5 h-5 ${
                isFav
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 hover:text-red-500'
              } transition-colors duration-200`}
            />
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-bright-ocean-500 text-white text-sm font-medium rounded-full backdrop-blur-sm">
              {cocktail.strCategory}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-bright-ocean-900 dark:text-yale-blue-100 mb-2 line-clamp-2 group-hover:text-bright-ocean-600 dark:group-hover:text-yale-blue-300 transition-colors">
            {cocktail.strDrink}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-bright-ocean-600 dark:text-yale-blue-400">
            <div className="flex items-center gap-1">
              <GlassWater className="w-4 h-4" />
              <span>{cocktail.strGlass}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5min</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            <span className="inline-block px-2 py-1 bg-bright-ocean-100 dark:bg-yale-blue-800 text-bright-ocean-700 dark:text-yale-blue-300 text-xs rounded-full">
              {cocktail.strAlcoholic}
            </span>
            {cocktail.strGlass && (
              <span className="inline-block px-2 py-1 bg-bright-ocean-100 dark:bg-yale-blue-800 text-bright-ocean-700 dark:text-yale-blue-300 text-xs rounded-full">
                {cocktail.strGlass}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
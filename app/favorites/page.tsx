// app/favorites/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useFavoritesStore } from '@/store/favoritesStore'
import { mealAPI } from '@/lib/api/meals'
import { cocktailAPI } from '@/lib/api/cocktails'
import { Meal } from '@/lib/types/meal'
import { Cocktail } from '@/lib/types/cocktail'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { CocktailCard } from '@/components/cocktails/CocktailCard'
import { Heart, Utensils, Wine } from 'lucide-react'

interface FavoriteItem {
    id: string
    type: 'meal' | 'cocktail'
    name: string
    image: string
    category: string
}

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavoritesStore()
    const [meals, setMeals] = useState<Meal[]>([])
    const [cocktails, setCocktails] = useState<Cocktail[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadFavorites()
    }, [favorites])

    const loadFavorites = async () => {
        setLoading(true)
        try {
            const mealFavorites = favorites.filter(fav => fav.type === 'meal')
            const cocktailFavorites = favorites.filter(fav => fav.type === 'cocktail')

            const mealPromises = mealFavorites.map(fav => mealAPI.getMealById(fav.id))
            const cocktailPromises = cocktailFavorites.map(fav => cocktailAPI.getCocktailById(fav.id))

            const mealResults = await Promise.all(mealPromises)
            const cocktailResults = await Promise.all(cocktailPromises)

            setMeals(mealResults.filter(Boolean) as Meal[])
            setCocktails(cocktailResults.filter(Boolean) as Cocktail[])
        } catch (error) {
            console.error('Error loading favorites:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveFavorite = (id: string, type: 'meal' | 'cocktail') => {
        removeFavorite(id, type)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bright-ocean-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-bright-ocean-50 dark:bg-yale-blue-950 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Heart className="w-8 h-8 text-red-500 fill-current" />
                        <h1 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100">
                            My Favorites
                        </h1>
                    </div>
                    <p className="text-lg text-bright-ocean-600 dark:text-yale-blue-300 max-w-2xl mx-auto">
                        Your saved recipes and cocktails in one place
                    </p>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart className="w-16 h-16 text-bright-ocean-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-bright-ocean-600 dark:text-yale-blue-400 mb-4">
                            No favorites yet
                        </h2>
                        <p className="text-bright-ocean-500 dark:text-yale-blue-500 mb-8">
                            Start exploring recipes and cocktails to add them to your favorites!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/recipes" className="btn-primary">
                                <Utensils className="w-5 h-5 mr-2" />
                                Browse Recipes
                            </Link>
                            <Link href="/cocktails" className="btn-secondary">
                                <Wine className="w-5 h-5 mr-2" />
                                Explore Cocktails
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Favorite Recipes */}
                        {meals.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <Utensils className="w-6 h-6 text-bright-ocean-600" />
                                    <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100">
                                        Favorite Recipes ({meals.length})
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {meals.map((meal) => (
                                        <RecipeCard key={meal.idMeal} meal={meal} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Favorite Cocktails */}
                        {cocktails.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <Wine className="w-6 h-6 text-bright-ocean-600" />
                                    <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100">
                                        Favorite Cocktails ({cocktails.length})
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {cocktails.map((cocktail) => (
                                        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
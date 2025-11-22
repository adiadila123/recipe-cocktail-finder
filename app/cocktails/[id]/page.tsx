// app/cocktails/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { cocktailAPI } from '@/lib/api/cocktails'
import { Cocktail } from '@/lib/types/cocktail'
import { VideoEmbed } from '@/components/shared/VideoEmbed'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { useFavoritesStore } from '@/store/favoritesStore'
import { Heart, Clock, GlassWater, ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function CocktailDetail() {
    const params = useParams()
    const id = params.id as string
    const [cocktail, setCocktail] = useState<Cocktail | null>(null)
    const [loading, setLoading] = useState(true)

    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()

    useEffect(() => {
        const loadCocktail = async () => {
            try {
                const cocktailData = await cocktailAPI.getCocktailById(id)
                setCocktail(cocktailData)
            } catch (error) {
                console.error('Error loading cocktail:', error)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            loadCocktail()
        }
    }, [id])

    const handleFavoriteClick = () => {
        if (!cocktail) return

        if (isFavorite(cocktail.idDrink, 'cocktail')) {
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

    const getIngredients = () => {
        if (!cocktail) return []

        const ingredients = []
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail]
            const measure = cocktail[`strMeasure${i}` as keyof Cocktail]

            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    ingredient: ingredient,
                    measure: measure || '',
                })
            }
        }
        return ingredients
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bright-ocean-500"></div>
            </div>
        )
    }

    if (!cocktail) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-bright-ocean-800 mb-4">Cocktail not found</h1>
                    <Link href="/cocktails" className="btn-primary">
                        Back to Cocktails
                    </Link>
                </div>
            </div>
        )
    }

    const ingredients = getIngredients()
    const isFav = isFavorite(cocktail.idDrink, 'cocktail')

    return (
        <div className="min-h-screen bg-bright-ocean-50 dark:bg-yale-blue-950 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/cocktails"
                    className="inline-flex items-center gap-2 text-bright-ocean-600 dark:text-yale-blue-300 hover:text-bright-ocean-700 dark:hover:text-yale-blue-200 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Cocktails
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="card overflow-hidden">
                            <img
                                src={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleFavoriteClick}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                    isFav
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-bright-ocean-100 hover:bg-bright-ocean-200 dark:bg-yale-blue-800 dark:hover:bg-yale-blue-700 text-bright-ocean-700 dark:text-yale-blue-300'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>

                            <ShareButtons
                                title={cocktail.strDrink}
                                url={typeof window !== 'undefined' ? window.location.href : ''}
                                image={cocktail.strDrinkThumb}
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                                {cocktail.strDrink}
                            </h1>

                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="flex items-center gap-2 text-bright-ocean-600 dark:text-yale-blue-400">
                                    <Clock className="w-5 h-5" />
                                    <span>5 min</span>
                                </div>
                                <div className="flex items-center gap-2 text-bright-ocean-600 dark:text-yale-blue-400">
                                    <GlassWater className="w-5 h-5" />
                                    <span>{cocktail.strGlass}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-bright-ocean-500 text-white rounded-full text-sm">
                  {cocktail.strCategory}
                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    cocktail.strAlcoholic === 'Alcoholic'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-green-500 text-white'
                                }`}>
                  {cocktail.strAlcoholic}
                </span>
                                {cocktail.strGlass && (
                                    <span className="px-3 py-1 bg-bright-ocean-200 dark:bg-yale-blue-700 text-bright-ocean-800 dark:text-yale-blue-200 rounded-full text-sm">
                    {cocktail.strGlass}
                  </span>
                                )}
                                {cocktail.strIBA && (
                                    <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
                    IBA: {cocktail.strIBA}
                  </span>
                                )}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                                Ingredients
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ingredients.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-white dark:bg-yale-blue-800 rounded-lg border border-bright-ocean-200 dark:border-yale-blue-700"
                                    >
                                        <div className="w-2 h-2 bg-bright-ocean-500 rounded-full"></div>
                                        <span className="text-bright-ocean-700 dark:text-yale-blue-300">
                      {item.measure} {item.ingredient}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="card p-6 mb-8">
                    <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                        Instructions
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                        {cocktail.strInstructions.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-bright-ocean-700 dark:text-yale-blue-300 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Video and Sources */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cocktail.strVideo && (
                        <div>
                            <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                                Video Tutorial
                            </h2>
                            <VideoEmbed url={cocktail.strVideo} />
                            <a
                                href={cocktail.strVideo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-300"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Watch on YouTube
                            </a>
                        </div>
                    )}

                    {cocktail.strImageSource && (
                        <div>
                            <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                                Source
                            </h2>
                            <a
                                href={cocktail.strImageSource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-bright-ocean-500 hover:bg-bright-ocean-600 text-white rounded-lg font-semibold transition-colors duration-300"
                            >
                                <ExternalLink className="w-5 h-5" />
                                View Original Source
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
// app/search/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { mealAPI } from '@/lib/api/meals'
import { cocktailAPI } from '@/lib/api/cocktails'
import { Meal } from '@/lib/types/meal'
import { Cocktail } from '@/lib/types/cocktail'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { CocktailCard } from '@/components/cocktails/CocktailCard'
import { SearchBar } from '@/components/ui/SearchBar'
import {
    getSuggestions,
    getAutoCorrectCandidate,
    type Suggestion,
} from '@/lib/search/fuzzyIndex'

export default function SearchPage() {
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get('q') || ''
    const initialType = searchParams.get('type') || 'all'

    const [meals, setMeals] = useState<Meal[]>([])
    const [cocktails, setCocktails] = useState<Cocktail[]>([])
    const [loading, setLoading] = useState(false)

    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const [searchType, setSearchType] = useState(initialType)

    const [autoCorrect, setAutoCorrect] = useState<Suggestion | null>(null)
    const [relatedSuggestions, setRelatedSuggestions] = useState<Suggestion[]>([])

    useEffect(() => {
        if (initialQuery) {
            setSearchQuery(initialQuery)
            setSearchType(initialType)
            performSearch(initialQuery, initialType)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQuery, initialType])

    const performSearch = async (term: string, type: string) => {
        const query = term.trim()
        if (!query) return

        setLoading(true)
        setAutoCorrect(null)
        setRelatedSuggestions([])

        try {
            let mealsData: Meal[] = []
            let cocktailsData: Cocktail[] = []

            if (type === 'all' || type === 'recipes') {
                try {
                    mealsData = await mealAPI.searchMeals(query)
                } catch (error) {
                    console.error('Error searching meals:', error)
                    mealsData = []
                }
            }

            if (type === 'all' || type === 'cocktails') {
                try {
                    cocktailsData = await cocktailAPI.searchCocktails(query)
                } catch (error) {
                    console.error('Error searching cocktails:', error)
                    cocktailsData = []
                }
            }

            setMeals(mealsData || [])
            setCocktails(cocktailsData || [])

            const hasResults =
                (mealsData?.length ?? 0) + (cocktailsData?.length ?? 0) > 0

            if (!hasResults) {
                // Auto-corect: propune un termen mai bun dacă nu există rezultate
                const candidate = getAutoCorrectCandidate(query)
                if (
                    candidate &&
                    candidate.label.toLowerCase() !== query.toLowerCase()
                ) {
                    setAutoCorrect(candidate)
                }
            } else {
                // Related searches când avem rezultate
                const suggestions = getSuggestions(query, 5).filter(
                    (s) => s.label.toLowerCase() !== query.toLowerCase()
                )
                setRelatedSuggestions(suggestions)
            }
        } catch (error) {
            console.error('Error performing search:', error)
            setMeals([])
            setCocktails([])
            setAutoCorrect(null)
            setRelatedSuggestions([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (term: string) => {
        const query = term.trim()
        setSearchQuery(term)

        const params = new URLSearchParams({
            q: query,
            type: searchType,
        })
        window.history.pushState({}, '', `/search?${params.toString()}`)

        if (query) {
            performSearch(query, searchType)
        } else {
            setMeals([])
            setCocktails([])
            setAutoCorrect(null)
            setRelatedSuggestions([])
        }
    }

    const handleTypeChange = (type: string) => {
        setSearchType(type)

        const query = searchQuery.trim()
        if (query) {
            const params = new URLSearchParams({
                q: query,
                type,
            })
            window.history.pushState({}, '', `/search?${params.toString()}`)
            performSearch(query, type)
        }
    }

    const totalResults = meals.length + cocktails.length

    return (
        <div className="min-h-screen bg-bright-ocean-50 dark:bg-yale-blue-950 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                        Search Results
                    </h1>
                    {searchQuery && (
                        <p className="text-lg text-bright-ocean-600 dark:text-yale-blue-300">
                            {totalResults} results for &quot;{searchQuery}&quot;
                        </p>
                    )}
                </div>

                {/* Search Controls */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <div className="w-full max-w-2xl">
                            <SearchBar
                                onSearch={handleSearch}
                                placeholder="Search recipes and cocktails..."
                                value={searchQuery}
                            />
                        </div>
                        <select
                            value={searchType}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="px-4 py-3 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-900 dark:text-yale-blue-100 focus:outline-none focus:ring-2 focus:ring-bright-ocean-300"
                        >
                            <option value="all">All</option>
                            <option value="recipes">Recipes</option>
                            <option value="cocktails">Cocktails</option>
                        </select>
                    </div>
                </div>

                {/* Auto-correct mesaj (dacă nu avem rezultate) */}
                {!loading && autoCorrect && (
                    <div className="text-center mb-6">
                        <p className="text-sm text-bright-ocean-600 dark:text-yale-blue-300">
                            No results found for{' '}
                            <span className="font-semibold">&quot;{searchQuery}&quot;</span>.
                            {' '}
                            Did you mean{' '}
                            <button
                                type="button"
                                className="underline font-semibold"
                                onClick={() => handleSearch(autoCorrect.label)}
                            >
                                {autoCorrect.label}
                            </button>
                            ?
                        </p>
                    </div>
                )}

                {/* Related searches (când există rezultate) */}
                {!loading && relatedSuggestions.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2 justify-center items-center">
            <span className="text-sm text-bright-ocean-600 dark:text-yale-blue-300">
              Related searches:
            </span>
                        {relatedSuggestions.map((s) => (
                            <button
                                key={s.label}
                                type="button"
                                className="text-xs px-3 py-1 rounded-full border border-bright-ocean-200 dark:border-yale-blue-700 bg-white dark:bg-yale-blue-900 text-bright-ocean-700 dark:text-yale-blue-100 hover:bg-bright-ocean-50 hover:dark:bg-yale-blue-800 transition"
                                onClick={() => handleSearch(s.label)}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-ocean-500"></div>
                    </div>
                ) : (
                    <>
                        {totalResults > 0 ? (
                            <div className="space-y-8">
                                {/* Recipes Results */}
                                {meals.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-6">
                                            Recipes ({meals.length})
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {meals.map((meal) => (
                                                <RecipeCard key={meal.idMeal} meal={meal} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Cocktails Results */}
                                {cocktails.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-6">
                                            Cocktails ({cocktails.length})
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {cocktails.map((cocktail) => (
                                                <CocktailCard
                                                    key={cocktail.idDrink}
                                                    cocktail={cocktail}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : searchQuery ? (
                            <div className="text-center py-12">
                                {!autoCorrect && (
                                    <>
                                        <h3 className="text-xl font-semibold text-bright-ocean-600 dark:text-yale-blue-400 mb-2">
                                            No results found for &quot;{searchQuery}&quot;
                                        </h3>
                                        <p className="text-bright-ocean-500 dark:text-yale-blue-500">
                                            Try adjusting your search terms or filters.
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-semibold text-bright-ocean-600 dark:text-yale-blue-400 mb-2">
                                    Start searching
                                </h3>
                                <p className="text-bright-ocean-500 dark:text-yale-blue-500">
                                    Enter a search term to find recipes and cocktails.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

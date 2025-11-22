// app/cocktails/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { cocktailAPI } from '@/lib/api/cocktails'
import { Cocktail, CocktailCategory, CocktailGlass } from '@/lib/types/cocktail'
import { CocktailGrid } from '@/components/cocktails/CocktailGrid'
import { CocktailFilters } from '@/components/cocktails/CocktailFilters'
import { SearchBar } from '@/components/ui/SearchBar'
import { Pagination } from '@/components/ui/Pagination'

export default function CocktailsPage() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([])
    const [categories, setCategories] = useState<CocktailCategory[]>([])
    const [glasses, setGlasses] = useState<CocktailGlass[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedGlass, setSelectedGlass] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    useEffect(() => {
        loadInitialData()
    }, [])

    useEffect(() => {
        loadCocktails()
    }, [searchQuery, selectedCategory, selectedGlass, selectedType])

    const loadInitialData = async () => {
        try {
            const [categoriesData, glassesData] = await Promise.all([
                cocktailAPI.getCategories(),
                cocktailAPI.getGlasses(),
            ])

            setCategories(categoriesData)
            setGlasses(glassesData)
        } catch (error) {
            console.error('Error loading initial data:', error)
        }
    }

    const loadCocktails = async () => {
        setLoading(true)
        try {
            let cocktailsData: Cocktail[] = []

            if (searchQuery) {
                cocktailsData = await cocktailAPI.searchCocktails(searchQuery)
            } else if (selectedCategory) {
                cocktailsData = await cocktailAPI.getCocktailsByCategory(selectedCategory)
            } else if (selectedGlass) {
                cocktailsData = await cocktailAPI.getCocktailsByGlass(selectedGlass)
            } else {
                // Load some random cocktails for initial display
                const randomCocktails = await Promise.all(
                    Array.from({ length: 12 }, () => cocktailAPI.getRandomCocktail())
                )
                cocktailsData = randomCocktails.filter(Boolean) as Cocktail[]
            }

            setCocktails(cocktailsData)
            setCurrentPage(1)
        } catch (error) {
            console.error('Error loading cocktails:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setSelectedCategory('')
        setSelectedGlass('')
        setSelectedType('')
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setSelectedGlass('')
        setSelectedType('')
        setSearchQuery('')
    }

    const handleGlassChange = (glass: string) => {
        setSelectedGlass(glass)
        setSelectedCategory('')
        setSelectedType('')
        setSearchQuery('')
    }

    const handleTypeChange = (type: string) => {
        setSelectedType(type)
        setSelectedCategory('')
        setSelectedGlass('')
        setSearchQuery('')
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setSelectedGlass('')
        setSelectedType('')
    }

    // Pagination
    const totalPages = Math.ceil(cocktails.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedCocktails = cocktails.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="min-h-screen bg-bright-ocean-50 dark:bg-yale-blue-950 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                        Explore Cocktails
                    </h1>
                    <p className="text-lg text-bright-ocean-600 dark:text-yale-blue-300 max-w-2xl mx-auto">
                        Discover amazing cocktails from around the world. Filter by category, glass type, or search for specific drinks.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search cocktails..."
                        value={searchQuery}
                    />

                    <CocktailFilters
                        categories={categories}
                        glasses={glasses}
                        selectedCategory={selectedCategory}
                        selectedGlass={selectedGlass}
                        selectedType={selectedType}
                        onCategoryChange={handleCategoryChange}
                        onGlassChange={handleGlassChange}
                        onTypeChange={handleTypeChange}
                        onClearFilters={clearFilters}
                    />
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-ocean-500"></div>
                    </div>
                ) : (
                    <>
                        <CocktailGrid cocktails={paginatedCocktails} />

                        {cocktails.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}

                        {cocktails.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-semibold text-bright-ocean-600 dark:text-yale-blue-400 mb-2">
                                    No cocktails found
                                </h3>
                                <p className="text-bright-ocean-500 dark:text-yale-blue-500">
                                    Try adjusting your search or filters
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
// app/recipes/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { mealAPI } from '@/lib/api/meals'
import { Meal, MealCategory } from '@/lib/types/meal'
import { RecipeGrid } from '@/components/recipes/RecipeGrid'
import { RecipeFilters } from '@/components/recipes/RecipeFilters'
import { SearchBar } from '@/components/ui/SearchBar'
import { Pagination } from '@/components/ui/Pagination'

export default function RecipesPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [categories, setCategories] = useState<MealCategory[]>([])
  const [areas, setAreas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    loadMeals()
  }, [searchQuery, selectedCategory, selectedArea])

  const loadInitialData = async () => {
    try {
      const [categoriesData, areasData] = await Promise.all([
        mealAPI.getCategories(),
        mealAPI.getAreas(),
      ])
      
      setCategories(categoriesData)
      setAreas(areasData.map(area => area.strArea))
    } catch (error) {
      console.error('Error loading initial data:', error)
    }
  }

  const loadMeals = async () => {
    setLoading(true)
    try {
      let mealsData: Meal[] = []
      
      if (searchQuery) {
        mealsData = await mealAPI.searchMeals(searchQuery)
      } else if (selectedCategory) {
        mealsData = await mealAPI.getMealsByCategory(selectedCategory)
      } else if (selectedArea) {
        mealsData = await mealAPI.getMealsByArea(selectedArea)
      } else {
        // Load some random meals for initial display
        const randomMeals = await Promise.all(
          Array.from({ length: 12 }, () => mealAPI.getRandomMeal())
        )
        mealsData = randomMeals.filter(Boolean) as Meal[]
      }

      setMeals(mealsData)
      setCurrentPage(1)
    } catch (error) {
      console.error('Error loading meals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory('')
    setSelectedArea('')
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedArea('')
    setSearchQuery('')
  }

  const handleAreaChange = (area: string) => {
    setSelectedArea(area)
    setSelectedCategory('')
    setSearchQuery('')
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedArea('')
  }

  // Pagination
  const totalPages = Math.ceil(meals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMeals = meals.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-bright-ocean-50 dark:bg-yale-blue-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
            Discover Recipes
          </h1>
          <p className="text-lg text-bright-ocean-600 dark:text-yale-blue-300 max-w-2xl mx-auto">
            Explore delicious meals from around the world. Filter by category, cuisine, or search for specific recipes.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search recipes..."
            value={searchQuery}
          />
          
          <RecipeFilters
            categories={categories}
            areas={areas}
            selectedCategory={selectedCategory}
            selectedArea={selectedArea}
            onCategoryChange={handleCategoryChange}
            onAreaChange={handleAreaChange}
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
            <RecipeGrid meals={paginatedMeals} />
            
            {meals.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
            
            {meals.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-bright-ocean-600 dark:text-yale-blue-400 mb-2">
                  No recipes found
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
// components/recipes/RecipeFilters.tsx
'use client'

import { MealCategory } from '@/lib/types/meal'
import { Filter, X } from 'lucide-react'

interface RecipeFiltersProps {
    categories: MealCategory[]
    areas: string[]
    selectedCategory: string
    selectedArea: string
    onCategoryChange: (category: string) => void
    onAreaChange: (area: string) => void
    onClearFilters: () => void
}

export function RecipeFilters({
                                  categories,
                                  areas,
                                  selectedCategory,
                                  selectedArea,
                                  onCategoryChange,
                                  onAreaChange,
                                  onClearFilters,
                              }: RecipeFiltersProps) {
    const hasActiveFilters = selectedCategory || selectedArea

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-bright-ocean-600" />
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-900 dark:text-yale-blue-100 focus:outline-none focus:ring-2 focus:ring-bright-ocean-300"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.strCategory} value={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>
            </div>

            {/* Area Filter */}
            <div className="flex items-center gap-2">
                <select
                    value={selectedArea}
                    onChange={(e) => onAreaChange(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-900 dark:text-yale-blue-100 focus:outline-none focus:ring-2 focus:ring-bright-ocean-300"
                >
                    <option value="">All Cuisines</option>
                    {areas.map((area) => (
                        <option key={area} value={area}>
                            {area}
                        </option>
                    ))}
                </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-bright-ocean-600 dark:text-yale-blue-400 hover:text-bright-ocean-700 dark:hover:text-yale-blue-300 transition-colors duration-200"
                >
                    <X className="w-4 h-4" />
                    Clear Filters
                </button>
            )}
        </div>
    )
}
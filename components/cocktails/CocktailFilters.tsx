// components/cocktails/CocktailFilters.tsx
'use client'

import { CocktailCategory, CocktailGlass } from '@/lib/types/cocktail'
import { Filter, X } from 'lucide-react'

interface CocktailFiltersProps {
    categories: CocktailCategory[]
    glasses: CocktailGlass[]
    selectedCategory: string
    selectedGlass: string
    selectedType: string
    onCategoryChange: (category: string) => void
    onGlassChange: (glass: string) => void
    onTypeChange: (type: string) => void
    onClearFilters: () => void
}

export function CocktailFilters({
                                    categories,
                                    glasses,
                                    selectedCategory,
                                    selectedGlass,
                                    selectedType,
                                    onCategoryChange,
                                    onGlassChange,
                                    onTypeChange,
                                    onClearFilters,
                                }: CocktailFiltersProps) {
    const hasActiveFilters = selectedCategory || selectedGlass || selectedType

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

            {/* Glass Filter */}
            <div className="flex items-center gap-2">
                <select
                    value={selectedGlass}
                    onChange={(e) => onGlassChange(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-900 dark:text-yale-blue-100 focus:outline-none focus:ring-2 focus:ring-bright-ocean-300"
                >
                    <option value="">All Glasses</option>
                    {glasses.map((glass) => (
                        <option key={glass.strGlass} value={glass.strGlass}>
                            {glass.strGlass}
                        </option>
                    ))}
                </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
                <select
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-900 dark:text-yale-blue-100 focus:outline-none focus:ring-2 focus:ring-bright-ocean-300"
                >
                    <option value="">All Types</option>
                    <option value="Alcoholic">Alcoholic</option>
                    <option value="Non_Alcoholic">Non-Alcoholic</option>
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

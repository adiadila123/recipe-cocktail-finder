// components/recipes/RecipeGrid.tsx
import { Meal } from '@/lib/types/meal'
import { RecipeCard } from './RecipeCard'

interface RecipeGridProps {
    meals: Meal[]
}

export function RecipeGrid({ meals }: RecipeGridProps) {
    if (meals.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-bright-ocean-600 dark:text-yale-blue-400">No recipes found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
    )
}
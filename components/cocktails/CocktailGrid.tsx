// components/cocktails/CocktailGrid.tsx
import { Cocktail } from '@/lib/types/cocktail'
import { CocktailCard } from './CocktailCard'

interface CocktailGridProps {
    cocktails: Cocktail[]
}

export function CocktailGrid({ cocktails }: CocktailGridProps) {
    if (cocktails.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-bright-ocean-600 dark:text-yale-blue-400">No cocktails found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cocktails.map((cocktail) => (
                <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </div>
    )
}
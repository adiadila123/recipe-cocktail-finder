// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mealAPI } from '@/lib/api/meals'
import { cocktailAPI } from '@/lib/api/cocktails'
import { Meal } from '@/lib/types/meal'
import { Cocktail } from '@/lib/types/cocktail'
import { HeroSection } from '@/components/shared/HeroSection'
import { RecipeCard } from '@/components/recipes/RecipeCard'
import { CocktailCard } from '@/components/cocktails/CocktailCard'

export default function Home() {
    const [randomMeals, setRandomMeals] = useState<Meal[]>([])
    const [randomCocktails, setRandomCocktails] = useState<Cocktail[]>([])

    useEffect(() => {
        const loadRandomItems = async () => {
            const mealPromises = Array.from({ length: 4 }, () => mealAPI.getRandomMeal())
            const cocktailPromises = Array.from({ length: 4 }, () => cocktailAPI.getRandomCocktail())

            const meals = await Promise.all(mealPromises)
            const cocktails = await Promise.all(cocktailPromises)

            setRandomMeals(meals.filter(Boolean) as Meal[])
            setRandomCocktails(cocktails.filter(Boolean) as Cocktail[])
        }

        loadRandomItems()
    }, [])

    return (
        <div className="min-h-screen">
            <HeroSection />

            {/* Featured Recipes Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                            Featured Recipes
                        </h2>
                        <p className="text-lg text-bright-ocean-600 dark:text-yale-blue-300 max-w-2xl mx-auto">
                            Discover delicious recipes from around the world
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {randomMeals.map((meal) => (
                            <RecipeCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/recipes" className="btn-primary">
                            Browse All Recipes
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Cocktails Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bright-ocean-100 dark:bg-yale-blue-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-bright-ocean-800 dark:text-yale-blue-100 mb-4">
                            Featured Cocktails
                        </h2>
                        <p className="text-lg text-bright-ocean-600 dark:text-yale-blue-300 max-w-2xl mx-auto">
                            Explore handcrafted cocktails for every occasion
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {randomCocktails.map((cocktail) => (
                            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/cocktails" className="btn-primary">
                            Explore All Cocktails
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
// lib/api/meals.ts

import type {
    Meal,
    MealResponse,
    MealCategory,
    MealArea
} from "../types/meal"

const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export const mealAPI = {
    // Search meals by name
    searchMeals: async (query: string): Promise<Meal[]> => {
        const response = await fetch(`${BASE_URL}/search.php?s=${query}`)
        const data: MealResponse = await response.json()
        return data.meals || []
    },

    // Get meal by ID
    getMealById: async (id: string): Promise<Meal | null> => {
        const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
        const data: MealResponse = await response.json()
        return data.meals?.[0] || null
    },

    // Get random meal
    getRandomMeal: async (): Promise<Meal | null> => {
        const response = await fetch(`${BASE_URL}/random.php`)
        const data: MealResponse = await response.json()
        return data.meals?.[0] || null
    },

    // Get meals by category
    getMealsByCategory: async (category: string): Promise<Meal[]> => {
        const response = await fetch(`${BASE_URL}/filter.php?c=${category}`)
        const data: MealResponse = await response.json()
        return data.meals || []
    },

    // Get meals by area
    getMealsByArea: async (area: string): Promise<Meal[]> => {
        const response = await fetch(`${BASE_URL}/filter.php?a=${area}`)
        const data: MealResponse = await response.json()
        return data.meals || []
    },

    // Get meals by ingredient
    getMealsByIngredient: async (ingredient: string): Promise<Meal[]> => {
        const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`)
        const data: MealResponse = await response.json()
        return data.meals || []
    },

    // Get all categories
    getCategories: async (): Promise<MealCategory[]> => {
        const response = await fetch(`${BASE_URL}/list.php?c=list`)
        const data: { meals: MealCategory[] | null } = await response.json()
        return data.meals || []
    },

    // Get all areas
    getAreas: async (): Promise<MealArea[]> => {
        const response = await fetch(`${BASE_URL}/list.php?a=list`)
        const data: { meals: MealArea[] | null } = await response.json()
        return data.meals || []
    }
}

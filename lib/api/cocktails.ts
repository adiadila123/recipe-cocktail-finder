// lib/api/cocktails.ts
import type {
    Cocktail,
    CocktailCategory,
    CocktailGlass,
    CocktailResponse,
} from "@/lib/types/cocktail"

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1"

export const cocktailAPI = {
    // Search cocktails by name
    searchCocktails: async (query: string): Promise<Cocktail[]> => {
        const response = await fetch(`${BASE_URL}/search.php?s=${query}`)
        const data: CocktailResponse = await response.json()
        return data.drinks || []
    },

    // Get cocktail by ID
    getCocktailById: async (id: string): Promise<Cocktail | null> => {
        const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
        const data: CocktailResponse = await response.json()
        return data.drinks?.[0] || null
    },

    // Get random cocktail
    getRandomCocktail: async (): Promise<Cocktail | null> => {
        const response = await fetch(`${BASE_URL}/random.php`)
        const data: CocktailResponse = await response.json()
        return data.drinks?.[0] || null
    },

    // Get cocktails by category
    getCocktailsByCategory: async (category: string): Promise<Cocktail[]> => {
        const response = await fetch(`${BASE_URL}/filter.php?c=${category}`)
        const data: CocktailResponse = await response.json()
        return data.drinks || []
    },

    // Get cocktails by glass
    getCocktailsByGlass: async (glass: string): Promise<Cocktail[]> => {
        const response = await fetch(`${BASE_URL}/filter.php?g=${glass}`)
        const data: CocktailResponse = await response.json()
        return data.drinks || []
    },

    // Get cocktails by ingredient
    getCocktailsByIngredient: async (ingredient: string): Promise<Cocktail[]> => {
        const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`)
        const data: CocktailResponse = await response.json()
        return data.drinks || []
    },

    // Get all categories
    getCategories: async (): Promise<CocktailCategory[]> => {
        const response = await fetch(`${BASE_URL}/list.php?c=list`)
        const data: { drinks: CocktailCategory[] | null } = await response.json()
        return data.drinks || []
    },

    // Get all glasses
    getGlasses: async (): Promise<CocktailGlass[]> => {
        const response = await fetch(`${BASE_URL}/list.php?g=list`)
        const data: { drinks: CocktailGlass[] | null } = await response.json()
        return data.drinks || []
    },
}

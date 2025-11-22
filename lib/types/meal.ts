// lib/types/meal.ts

export interface Meal {
    idMeal: string
    strMeal: string
    strDrinkAlternate: string | null
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string | null
    strYoutube: string | null
    strSource: string | null
    strImageSource: string | null
    strCreativeCommonsConfirmed: string | null
    dateModified: string | null
    [key: `strIngredient${number}`]: string | null
    [key: `strMeasure${number}`]: string | null
}

export interface MealCategory {
    strCategory: string
}

export interface MealArea {
    strArea: string
}

export interface MealResponse {
    meals: Meal[] | null
}

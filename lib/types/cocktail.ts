// lib/types/cocktail.ts
export interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkAlternate: string | null
  strTags: string | null
  strVideo: string | null
  strCategory: string
  strIBA: string | null
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strDrinkThumb: string
  strImageSource: string | null
  strImageAttribution: string | null
  strCreativeCommonsConfirmed: string
  dateModified: string
  [key: `strIngredient${number}`]: string | null
  [key: `strMeasure${number}`]: string | null
}

export interface CocktailCategory {
  strCategory: string
}

export interface CocktailGlass {
  strGlass: string
}

export interface CocktailResponse {
  drinks: Cocktail[] | null
}
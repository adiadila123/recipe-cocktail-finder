// scripts/build-search-corpus.mjs

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Pentru a obține __dirname în ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function fetchJson(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
    }
    return res.json()
}

async function buildCorpus() {
    // 1) MealDB: categorii, zone, ingrediente, câteva rețete populare
    const mealCategoriesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    const mealAreasUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    const mealIngredientsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    const mealPopularUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' // „popular” generic

    // 2) CocktailDB: categorii, ingrediente, câteva cocktailuri populare
    const cocktailCategoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const cocktailIngredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
    const cocktailPopularUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

    console.log('Fetching data from MealDB and CocktailDB...')

    const [
        mealCategories,
        mealAreas,
        mealIngredients,
        mealPopular,
        cocktailCategories,
        cocktailIngredients,
        cocktailPopular,
    ] = await Promise.all([
        fetchJson(mealCategoriesUrl),
        fetchJson(mealAreasUrl),
        fetchJson(mealIngredientsUrl),
        fetchJson(mealPopularUrl),
        fetchJson(cocktailCategoriesUrl),
        fetchJson(cocktailIngredientsUrl),
        fetchJson(cocktailPopularUrl),
    ])

    const corpus = []

    // MEALS: categorii
    if (mealCategories.meals) {
        for (const c of mealCategories.meals) {
            if (c.strCategory) {
                corpus.push({
                    label: c.strCategory,
                    type: 'category',
                    source: 'meal',
                })
            }
        }
    }

    // MEALS: arii (Italian, Mexican etc.)
    if (mealAreas.meals) {
        for (const a of mealAreas.meals) {
            if (a.strArea) {
                corpus.push({
                    label: a.strArea,
                    type: 'category',
                    source: 'meal-area',
                })
            }
        }
    }

    // MEALS: ingrediente
    if (mealIngredients.meals) {
        for (const i of mealIngredients.meals) {
            if (i.strIngredient) {
                corpus.push({
                    label: i.strIngredient,
                    type: 'ingredient',
                    source: 'meal',
                })
            }
        }
    }

    // MEALS: câteva rețete populare (search generic)
    if (mealPopular.meals) {
        for (const m of mealPopular.meals) {
            if (m.strMeal) {
                corpus.push({
                    label: m.strMeal,
                    type: 'meal',
                    source: 'meal',
                })
            }
        }
    }

    // COCKTAILS: categorii
    if (cocktailCategories.drinks) {
        for (const c of cocktailCategories.drinks) {
            if (c.strCategory) {
                corpus.push({
                    label: c.strCategory,
                    type: 'category',
                    source: 'cocktail',
                })
            }
        }
    }

    // COCKTAILS: ingrediente
    if (cocktailIngredients.drinks) {
        for (const i of cocktailIngredients.drinks) {
            if (i.strIngredient1) {
                corpus.push({
                    label: i.strIngredient1,
                    type: 'ingredient',
                    source: 'cocktail',
                })
            }
        }
    }

    // COCKTAILS: câteva băuturi populare
    if (cocktailPopular.drinks) {
        for (const d of cocktailPopular.drinks) {
            if (d.strDrink) {
                corpus.push({
                    label: d.strDrink,
                    type: 'cocktail',
                    source: 'cocktail',
                })
            }
        }
    }

    // Curățare: eliminăm duplicatele pe baza label + type
    const unique = []
    const seen = new Set()

    for (const item of corpus) {
        const key = `${item.label.toLowerCase()}|${item.type}`
        if (!seen.has(key)) {
            seen.add(key)
            unique.push(item)
        }
    }

    const outputDir = path.join(__dirname, '..', 'lib', 'data')
    const outputPath = path.join(outputDir, 'searchCorpus.generated.json')

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2), 'utf8')

    console.log(`Generated corpus with ${unique.length} items:`)
    console.log(outputPath)
}

buildCorpus().catch((err) => {
    console.error(err)
    process.exit(1)
})

// lib/data/searchCorpus.ts

export type SearchCorpusItem = {
    label: string
    type: 'meal' | 'cocktail' | 'category' | 'ingredient'
}

// Termeni statici – fallback + chestii populare
const STATIC_SEARCH_CORPUS: SearchCorpusItem[] = [
    // Cocktails
    { label: 'Margarita', type: 'cocktail' },
    { label: 'Mojito', type: 'cocktail' },
    { label: 'Old Fashioned', type: 'cocktail' },
    { label: 'Negroni', type: 'cocktail' },
    { label: 'Daiquiri', type: 'cocktail' },
    { label: 'Martini', type: 'cocktail' },
    { label: 'Bloody Mary', type: 'cocktail' },

    // Meals
    { label: 'Spaghetti Bolognese', type: 'meal' },
    { label: 'Chicken Curry', type: 'meal' },
    { label: 'Beef Stroganoff', type: 'meal' },
    { label: 'Tiramisu', type: 'meal' },
    { label: 'Lasagna', type: 'meal' },
    { label: 'Caesar Salad', type: 'meal' },

    // Categories
    { label: 'Seafood', type: 'category' },
    { label: 'Vegetarian', type: 'category' },
    { label: 'Vegan', type: 'category' },
    { label: 'Dessert', type: 'category' },

    // Ingredients
    { label: 'Chicken', type: 'ingredient' },
    { label: 'Beef', type: 'ingredient' },
    { label: 'Pasta', type: 'ingredient' },
    { label: 'Tomato', type: 'ingredient' },
    { label: 'Gin', type: 'ingredient' },
    { label: 'Rum', type: 'ingredient' },
    { label: 'Tequila', type: 'ingredient' },
]

// Încercăm să importăm fișierul generat.
// Dacă nu există (ex: în dev înainte să rulezi scriptul), rămânem doar pe STATIC.
let generated: SearchCorpusItem[] = []

try {
    // Import tip CommonJS pentru JSON – merge cu next / webpack / swc
    // dacă ai "resolveJsonModule": true în tsconfig.json poți face import direct.
    // @ts-ignore – lăsăm bundlerul să gestioneze JSON-ul
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const generatedJson = require('./searchCorpus.generated.json') as {
        label: string
        type: SearchCorpusItem['type']
    }[]

    if (Array.isArray(generatedJson)) {
        generated = generatedJson.map((item) => ({
            label: item.label,
            type: item.type,
        }))
    }
} catch (err) {
    // Silent fallback – nu stricăm build-ul dacă nu există fișierul
    console.warn(
        '[searchCorpus] No generated corpus found. Run `npm run build:search-corpus` to generate a richer dataset.'
    )
}

function mergeAndDeduplicate(
    staticItems: SearchCorpusItem[],
    generatedItems: SearchCorpusItem[]
): SearchCorpusItem[] {
    const all = [...staticItems, ...generatedItems]
    const seen = new Set<string>()
    const result: SearchCorpusItem[] = []

    for (const item of all) {
        const key = `${item.label.toLowerCase()}|${item.type}`
        if (!seen.has(key)) {
            seen.add(key)
            result.push(item)
        }
    }

    return result
}

export const SEARCH_CORPUS: SearchCorpusItem[] = mergeAndDeduplicate(
    STATIC_SEARCH_CORPUS,
    generated
)

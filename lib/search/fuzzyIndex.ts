// lib/search/fuzzyIndex.ts
import Fuse from 'fuse.js'
import { SEARCH_CORPUS, type SearchCorpusItem } from '@/lib/data/searchCorpus'

const fuse = new Fuse<SearchCorpusItem>(SEARCH_CORPUS, {
    keys: ['label'],
    includeScore: true,
    threshold: 0.4,         // cât de „larg” e fuzzy search-ul (0 = strict, 1 = foarte permisiv)
    distance: 100,
    minMatchCharLength: 2,
})

export type Suggestion = {
    label: string
    type: SearchCorpusItem['type']
    score: number
}

/**
 * Sugestii de auto-complete în timp ce tastezi
 */
export function getSuggestions(query: string, limit = 5): Suggestion[] {
    const q = query.trim()
    if (!q) return []

    const results = fuse.search(q, { limit })
    return results.map((r) => ({
        label: r.item.label,
        type: r.item.type,
        score: r.score ?? 0,
    }))
}

/**
 * Sugestie de auto-corectare când nu există rezultate.
 * Întoarce cel mai bun termen dacă scorul e „suficient de bun”.
 */
export function getAutoCorrectCandidate(
    query: string,
    maxScore = 0.45
): Suggestion | null {
    const q = query.trim()
    if (!q) return null

    const results = fuse.search(q, { limit: 1 })
    const best = results[0]
    if (!best) return null

    if (best.score !== undefined && best.score <= maxScore) {
        return {
            label: best.item.label,
            type: best.item.type,
            score: best.score,
        }
    }

    return null
}

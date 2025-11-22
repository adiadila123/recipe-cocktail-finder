// components/ui/SearchBar.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
    value?: string
}

export function SearchBar({ onSearch, placeholder = "Search...", value = "" }: SearchBarProps) {
    const [query, setQuery] = useState(value)
    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        setQuery(value)
    }, [value])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        onSearch(query)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)

        // Debounce search
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            onSearch(newQuery)
        }, 500)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bright-ocean-400 w-5 h-5" />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-900 dark:text-yale-blue-100 placeholder-bright-ocean-400 dark:placeholder-yale-blue-400 focus:outline-none focus:ring-2 focus:ring-bright-ocean-300 focus:border-transparent"
                />
            </div>
        </form>
    )
}
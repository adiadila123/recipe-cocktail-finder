// components/ui/Pagination.tsx
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-600 dark:text-yale-blue-400 hover:bg-bright-ocean-50 dark:hover:bg-yale-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        currentPage === page
                            ? 'bg-bright-ocean-500 text-white'
                            : 'bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-600 dark:text-yale-blue-400 hover:bg-bright-ocean-50 dark:hover:bg-yale-blue-700'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white dark:bg-yale-blue-800 border border-bright-ocean-200 dark:border-yale-blue-700 text-bright-ocean-600 dark:text-yale-blue-400 hover:bg-bright-ocean-50 dark:hover:bg-yale-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    )
}
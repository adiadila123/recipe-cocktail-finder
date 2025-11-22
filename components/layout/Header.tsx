// components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Utensils, Wine, Heart, Search, Moon, Sun } from 'lucide-react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const pathname = usePathname()

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        { href: '/', label: 'Home', icon: null },
        { href: '/recipes', label: 'Recipes', icon: Utensils },
        { href: '/cocktails', label: 'Cocktails', icon: Wine },
        { href: '/favorites', label: 'Favorites', icon: Heart },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-yale-blue-950/80 backdrop-blur-md border-b border-bright-ocean-200 dark:border-yale-blue-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-bright-ocean-500 rounded-lg flex items-center justify-center">
                            <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-bright-ocean-800 dark:text-yale-blue-100">
                            TasteHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'text-bright-ocean-600 dark:text-yale-blue-300 bg-bright-ocean-50 dark:bg-yale-blue-800'
                                            : 'text-bright-ocean-700 dark:text-yale-blue-400 hover:text-bright-ocean-600 dark:hover:text-yale-blue-300'
                                    }`}
                                >
                                    {Icon && <Icon className="w-4 h-4" />}
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 text-bright-ocean-600 dark:text-yale-blue-400 hover:text-bright-ocean-700 dark:hover:text-yale-blue-300 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Search Link */}
                        <Link
                            href="/search"
                            className="p-2 text-bright-ocean-600 dark:text-yale-blue-400 hover:text-bright-ocean-700 dark:hover:text-yale-blue-300 transition-colors duration-200"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 text-bright-ocean-600 dark:text-yale-blue-400 hover:text-bright-ocean-700 dark:hover:text-yale-blue-300 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-bright-ocean-200 dark:border-yale-blue-800">
                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-colors duration-200 ${
                                            isActive
                                                ? 'text-bright-ocean-600 dark:text-yale-blue-300 bg-bright-ocean-50 dark:bg-yale-blue-800'
                                                : 'text-bright-ocean-700 dark:text-yale-blue-400 hover:text-bright-ocean-600 dark:hover:text-yale-blue-300'
                                        }`}
                                    >
                                        {Icon && <Icon className="w-5 h-5" />}
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
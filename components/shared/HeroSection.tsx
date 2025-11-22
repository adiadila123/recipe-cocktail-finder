// components/shared/HeroSection.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Utensils, Wine, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchType, setSearchType] = useState<'all' | 'recipes' | 'cocktails'>('all')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            // Redirect to search page with query
            const params = new URLSearchParams({
                q: searchQuery.trim(),
                type: searchType,
            })
            window.location.href = `/search?${params.toString()}`
        }
    }

    const stats = [
        { number: '500+', label: 'Recipes' },
        { number: '300+', label: 'Cocktails' },
        { number: '50+', label: 'Categories' },
    ]

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80"
                    alt="Delicious food and cocktails background"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>
                {/* Subtle Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Animated Title */}
                <div className="animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                        Taste<span className="text-bright-ocean-400">Hub</span>
                    </h1>

                    <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                        Discover amazing recipes and handcrafted cocktails from around the world.
                        Your ultimate culinary adventure starts here.
                    </p>
                </div>

                {/* Search Section */}
                <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bright-ocean-400 w-6 h-6" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for recipes, cocktails, ingredients..."
                                    className="w-full pl-14 pr-4 py-5 text-lg rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-white/20 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-bright-ocean-300 focus:border-bright-ocean-400 shadow-2xl transition-all duration-300"
                                />
                            </div>

                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value as any)}
                                className="px-6 py-5 text-lg rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-white/20 text-gray-900 focus:outline-none focus:ring-4 focus:ring-bright-ocean-300 focus:border-bright-ocean-400 shadow-2xl transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                <option value="recipes">Recipes</option>
                                <option value="cocktails">Cocktails</option>
                            </select>

                            <button
                                type="submit"
                                className="px-10 py-5 bg-bright-ocean-500 hover:bg-bright-ocean-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Quick Navigation */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
                    <Link
                        href="/recipes"
                        className="group relative overflow-hidden flex items-center gap-4 px-10 py-5 bg-white/20 backdrop-blur-xl text-white rounded-2xl hover:bg-white/30 transition-all duration-500 border-2 border-white/30 hover:border-white/50 shadow-2xl hover:shadow-3xl min-w-[200px] justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-bright-ocean-500/20 to-bright-ocean-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <Utensils className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                        <span className="font-semibold text-lg relative z-10">Browse Recipes</span>
                    </Link>

                    <Link
                        href="/cocktails"
                        className="group relative overflow-hidden flex items-center gap-4 px-10 py-5 bg-white/20 backdrop-blur-xl text-white rounded-2xl hover:bg-white/30 transition-all duration-500 border-2 border-white/30 hover:border-white/50 shadow-2xl hover:shadow-3xl min-w-[200px] justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-bright-ocean-500/20 to-bright-ocean-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <Wine className="w-7 h-7 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                        <span className="font-semibold text-lg relative z-10">Explore Cocktails</span>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white animate-fade-in-up animation-delay-600">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                            <div className="text-4xl font-bold text-bright-ocean-300 mb-2 drop-shadow-lg">{stat.number}</div>
                            <div className="text-gray-200 text-lg font-medium drop-shadow">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <div className="flex flex-col items-center text-white/80">
                    <span className="text-sm mb-2"></span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </div>

            {/* Floating Elements for Visual Interest */}
            <div className="absolute top-20 left-10 w-8 h-8 bg-bright-ocean-400/30 rounded-full animate-float"></div>
            <div className="absolute top-40 right-20 w-6 h-6 bg-bright-ocean-300/40 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-40 left-20 w-10 h-10 bg-bright-ocean-500/20 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-4 h-4 bg-bright-ocean-200/50 rounded-full animate-float animation-delay-1500"></div>
        </section>
    )
}
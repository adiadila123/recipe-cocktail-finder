import { Utensils } from "lucide-react";

// components/layout/Footer.tsx
export function Footer() {
    return (
        <footer className="bg-bright-ocean-800 dark:bg-yale-blue-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-bright-ocean-400 rounded-lg flex items-center justify-center">
                                <Utensils className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold">TasteHub</span>
                        </div>
                        <p className="text-bright-ocean-200 text-sm mt-2">
                            Discover amazing recipes and cocktails
                        </p>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-bright-ocean-200 text-sm">
                            Powered by TheMealDB & TheCocktailDB
                        </p>
                        <p className="text-bright-ocean-300 text-xs mt-1">
                            © {new Date().getFullYear()} TasteHub. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
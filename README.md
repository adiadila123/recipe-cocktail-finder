# Recipe Cocktail Finder

An interactive food & drink discovery application built with **Next.js 14**, **TypeScript**, and **TailwindCSS**.  
Users can explore cocktails and meals, search by name or category, and save favourites in a clean, responsive interface.

## 🚀 Features

- Browse **cocktails** and **meals** from public APIs (TheCocktailDB & TheMealDB)
- Search recipes by name
- View detailed recipe pages with:
  - Ingredients & measures
  - Preparation instructions
  - Thumbnail image
- Save favourites (stored in LocalStorage)
- Separate pages for:
  - `/cocktails` – list & details
  - `/recipes` – meals list & details
  - `/favorites` – saved items
  - `/search` – unified search experience
- Built with the **App Router** in Next.js 14

## 🧱 Tech Stack

- **Next.js 14** (App Router)
- **React** + **TypeScript**
- **TailwindCSS**
- **Shadcn/UI** components
- **Lucide Icons**
- **TheCocktailDB** & **TheMealDB** public APIs
- LocalStorage for persisting favourites

## 📂 Project Structure (simplified)

```bash
app/
  page.tsx             # Home page
  cocktails/           # Cocktails listing & details
    page.tsx
    [id]/page.tsx
  recipes/             # Meals listing & details
    page.tsx
    [id]/page.tsx
  favorites/page.tsx   # Favourites page
  search/page.tsx      # Search page

lib/
  api/                 # API clients
    cocktails.ts
    meals.ts
  types/               # Shared TypeScript types
    cocktail.ts
    meal.ts

components/
  ui/                  # Reusable UI components
  layout/              # Layout-related components

public/
  # Static assets (icons, images, etc.)
```

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/recipe-cocktail-finder.git
cd recipe-cocktail-finder
```

### 2. Install dependencies

```bash
npm install
# sau
yarn
# sau
pnpm install
```

### 3. Configure environment variables

Creează un fișier `.env.local` în root-ul proiectului (dacă ai nevoie de variabile custom):

```bash
# Exemplu (dacă vei adăuga chei sau proxy-uri)
NEXT_PUBLIC_API_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1
```

Momentan, proiectul folosește direct endpoint-urile publice TheCocktailDB și TheMealDB, deci poate funcționa și fără variabile.

### 4. Rulează în modul development

```bash
npm run dev
```

Apoi deschide:

```text
http://localhost:3000
```

### 5. Build pentru producție

```bash
npm run build
npm run start
```

## 📜 Available Scripts

```bash
npm run dev      # Pornește serverul de development
npm run build    # Creează build-ul de producție
npm run start    # Rulează aplicația în modul producție
npm run lint     # Rulează linter-ul
```

## 🌐 APIs

Acest proiect folosește:

- [TheCocktailDB](https://www.thecocktaildb.com/)
- [TheMealDB](https://www.themealdb.com/)

Request-urile sunt gestionate prin clienți dedicați în `lib/api/cocktails.ts` și `lib/api/meals.ts`.

## 🧪 Linting & Type Safety

- TypeScript strict pentru tipuri sigure
- Integrare cu `next lint` pentru bune practici în React/Next.js

## 📸 Screenshots (optional)

Poți adăuga imagini în `public/screenshots` și să le referențiezi aici:

```md
![Home Page](public/screenshots/home.png)
![Cocktail Details](public/screenshots/cocktail-details.png)
![Search Page](public/screenshots/search.png)
```

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute it as needed.

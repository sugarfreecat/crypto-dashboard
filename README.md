# Crypto Dashboard

A real-time cryptocurrency dashboard built with React and TypeScript, featuring price history charts, responsive layout, and a clean layered architecture.

## Why I Built This

After a recent layoff, I used the transition to modernize my stack. I had built my foundation with PHP, jQuery, and Bootstrap — but knew it was time to align with where the market is heading.

I chose cryptocurrency data intentionally: CoinGecko's public API is free, well-documented, and rich enough to demonstrate the skills I wanted to practice — asynchronous data fetching, time-series visualization, and financial data formatting. The domain is a vehicle. What interested me was what it took to make it work properly.

---

## Features

- 📈 **Real-time market data** — top 10 cryptocurrencies by market cap, fetched from CoinGecko's public API
- 📉 **7-day price history charts** — time-series axis with one label per day and full timestamp on hover (inspired by Google Finance)
- 💀 **Loading skeletons** — placeholder UI while data loads, preventing layout shift
- ⚠️ **Error handling** — graceful error state with retry action
- ⚡ **Data caching** — automatic cache, deduplication, and background refetching via TanStack Query
- 📱 **Responsive grid layout** — 1 column on mobile, 2 on tablet, 3 on desktop
- 🧭 **Client-side routing** — navigation between dashboard and per-coin detail pages without page reload

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Data Fetching | TanStack Query (React Query) |
| Charts | Recharts |
| Routing | React Router v6 |
| Data Source | CoinGecko Public API |

---

## Architecture

The project follows a layered architecture separating concerns across three distinct layers:

```
src/
├── services/        # Data fetching logic — knows how to get data, nothing about UI
│   └── cryptoService.ts
├── components/      # Presentational components — know how to render, not where data comes from
│   ├── CoinCard.tsx
│   ├── CoinCardSkeleton.tsx
│   └── PriceChart.tsx
├── pages/           # Route-level components — orchestrate data and layout per screen
│   └── CoinDetail.tsx
├── types/           # Shared TypeScript interfaces
│   └── crypto.ts
└── App.tsx          # Root component and dashboard page
```

This separation means: swapping the data source only requires changing `services/`. Changing how a card looks only requires changing `CoinCard.tsx`. Neither layer knows about the other's internals — low coupling by design.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/sugarfreecat/crypto-dashboard

# Navigate to the project folder
cd crypto-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open localhost in your browser.

## Roadmap

- [ ] Dark / light mode toggle (system preference + manual override)
- [ ] Internationalization (i18n) — language and currency based on locale, with manual override
- [ ] Portfolio tracker — add holdings, track purchase price, see real-time profit/loss
- [ ] Backend migration — replace localStorage with a REST API (Java Spring Boot or .NET)

---

## What I Learned

A few things worth documenting from building this:

**On React's `useEffect`:** In development, React's `StrictMode` intentionally runs effects twice to surface bugs. This caused me to hit CoinGecko's rate limit faster than expected — which led to a useful lesson: what looks like a CORS error in the browser isn't always a CORS problem.

**On TypeScript and third-party libraries:** Library types are often more generic than the specific case you're handling. When Recharts' `formatter` prop expects `ValueType | undefined` and your function only handles `number`, TypeScript will reject it. The fix — wrapping in an anonymous function and using `Number(value)` — is a pattern that comes up constantly with typed libraries.

**On architecture decisions:** Keeping the timestamp as a raw number all the way from the service layer to the chart component (instead of formatting it to a string in the service) made it possible to format differently for axis labels vs. tooltip text — with no changes to the data layer.

---

## License

MIT

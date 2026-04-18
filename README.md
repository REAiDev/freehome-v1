# FreeHome.World - Homepage

A Next.js application showcasing a property marketplace homepage with mock data integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

The homepage will load with property and municipality data.

## 🏗️ Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📋 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Homepage component
│   ├── layout.tsx              # Root layout
│   ├── providers.tsx           # React providers
│   ├── not-found.tsx           # 404 page
│   └── api/graphql/route.ts    # GraphQL API endpoint
├── components/
│   ├── homepage/               # Homepage-specific components
│   ├── layout/                 # Navigation components
│   ├── common/                 # Shared components
│   └── ui/                     # Base UI components
├── services/
│   ├── homepage-service.ts     # Homepage data fetching
│   ├── graphql-service.ts      # GraphQL proxy service
│   └── mock-graphql-service.ts # Data service
├── hooks/
│   └── use-homepage-data.ts    # Homepage data hook
├── lib/
│   ├── apollo-*.ts            # Apollo Client setup
│   └── utils.ts               # Utility functions
├── types/
│   ├── core.ts                # Core type definitions
│   └── property.ts            # Property types
└── mock-data/graphql/         # JSON data files
```

## 📊 Data System

The application uses a GraphQL API for data fetching:

- **Data location**: `mock-data/graphql/*.json`
- **Supported operations**: GetProperties, GetMunicipalities, GetPropertyStatistics, GetCountries

### Data Files
- `GetCountries.json` - List of countries
- `GetPropertyStatistics.json` - Property statistics and charts data
- `GetProperties-*.json` - Property listings with different parameters
- `GetMunicipalities-*.json` - Municipality listings with different parameters
- `operation-mapping.json` - Maps GraphQL operations to data files


## 🛠️ Technical Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Data Fetching**: Apollo Client + React Query
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "15.3.3",
    "react": "^19.0.0",
    "@apollo/client": "^3.13.8",
    "@tanstack/react-query": "^5.81.2",
    "lucide-react": "^0.515.0",
    "tailwindcss": "^3.4.17"
  }
}
```

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration (if needed)
- `.env` - Environment variables

## 📝 Environment Variables

```bash
# GraphQL Configuration
GRAPHQL_MOCK_MODE=true                    # Enable data mode
BACKEND_API_URL=http://example.com        # Backend URL
```

## 🚀 Performance

- **Homepage bundle**: ~15kB (optimized for single page)
- **First Load JS**: ~126kB total
- **Static generation**: Homepage pre-rendered at build time

## 📱 Responsive Design

The homepage is fully responsive with breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🧪 Development Notes

### Adding Data
1. Add new JSON files to `mock-data/graphql/`
2. Update `operation-mapping.json` with new operation mappings
3. Restart development server

### Customizing Styles
- Modify Tailwind classes in components
- Update `tailwind.config.js` for theme changes
- Global styles in `src/app/globals.css`

### Connecting to API
1. Set `GRAPHQL_MOCK_MODE=false` in `.env`
2. Configure `BACKEND_API_URL` to your GraphQL endpoint
3. Ensure backend API matches expected schema

## 🐛 Troubleshooting

**Build fails with module errors:**
- Run `npm install` to ensure dependencies are installed
- Check that all required files exist in mock-data directory

**Homepage shows no data:**
- Verify `GRAPHQL_MOCK_MODE=true` in `.env`
- Check JSON files exist and have valid JSON syntax
- Check browser console for API errors

**Styling issues:**
- Run `npm run build` to ensure Tailwind builds properly
- Check for conflicting CSS classes
- Verify Tailwind config matches component usage

## 📄 License

This project is for demonstration purposes. Check with project maintainers for licensing details.
# Complete Files Reference

## Archive Contents: `emissions-forecast.tar.gz` (1.8 MB)

This archive contains the complete project. Extract it and run `npm install` to get started.

---

## ROOT CONFIGURATION FILES

```
package.json                    # NPM dependencies & scripts
package-lock.json              # Locked dependency versions
tsconfig.json                   # TypeScript configuration
vite.config.ts                  # Vite build configuration
postcss.config.js              # PostCSS plugins (Tailwind, Autoprefixer)
components.json                 # Shadcn/UI configuration
drizzle.config.ts              # Database configuration (optional)
vite-plugin-meta-images.ts     # Vite plugin for meta tags
.replit                         # Replit configuration
.gitignore                      # Git ignore rules
```

---

## FRONTEND APPLICATION: `client/src/`

### Pages (Views)
```
pages/
├── dashboard.tsx               # Main emissions forecast dashboard
└── not-found.tsx              # 404 page
```

### Layout Components
```
components/layout/
├── shell.tsx                   # Main app wrapper with sidebar
└── sidebar.tsx                 # Navigation sidebar (Left menu)
```

### Dashboard Widgets
```
components/dashboard/
├── emissions-chart.tsx         # Interactive stacked area chart (Recharts)
├── overview-metrics.tsx        # KPI cards (Total Emissions, Intensity)
└── report-view.tsx             # AI Generated Insights panel
```

### UI Components Library (55 components from Shadcn/UI)
```
components/ui/
├── button.tsx                  # Button component
├── card.tsx                    # Card container
├── select.tsx                  # Dropdown select
├── tabs.tsx                    # Tabbed interface
├── badge.tsx                   # Status badges
├── label.tsx                   # Form labels
├── input.tsx                   # Text input
├── scroll-area.tsx             # Scrollable container
├── accordion.tsx               # Collapsible accordion
├── alert-dialog.tsx            # Alert dialogs
├── table.tsx                   # Data table
├── dialog.tsx                  # Modal dialog
├── slider.tsx                  # Range slider
├── switch.tsx                  # Toggle switch
├── checkbox.tsx                # Checkbox
├── radio-group.tsx             # Radio buttons
├── progress.tsx                # Progress bar
├── skeleton.tsx                # Loading skeleton
├── spinner.tsx                 # Loading spinner
├── command.tsx                 # Command palette
├── tooltip.tsx                 # Tooltips
├── popover.tsx                 # Popover menu
├── separator.tsx               # Horizontal divider
├── toast.tsx                   # Toast notifications
├── sonner.tsx                  # Sonner notifications
├── form.tsx                    # React Hook Form wrapper
├── avatar.tsx                  # User avatar
├── breadcrumb.tsx              # Breadcrumb navigation
├── calendar.tsx                # Date picker
├── carousel.tsx                # Image carousel
├── chart.tsx                   # Recharts wrapper
├── collapsible.tsx             # Collapsible content
├── context-menu.tsx            # Right-click context menu
├── drawer.tsx                  # Side drawer
├── dropdown-menu.tsx           # Dropdown menu
├── empty.tsx                   # Empty state
├── field.tsx                   # Field wrapper
├── hover-card.tsx              # Hover card
├── input-group.tsx             # Grouped inputs
├── input-otp.tsx               # OTP input
├── item.tsx                    # List item
├── kbd.tsx                     # Keyboard key display
├── menubar.tsx                 # Menu bar
├── navigation-menu.tsx         # Navigation menu
├── pagination.tsx              # Pagination
├── resizable.tsx               # Resizable panels
├── sheet.tsx                   # Sheet dialog
├── sidebar.tsx                 # Sidebar layout
├── toggle.tsx                  # Toggle button
├── toggle-group.tsx            # Toggle group
└── toaster.tsx                 # Toast container
```

### Hooks
```
hooks/
├── use-mobile.tsx              # Detect mobile viewport
└── use-toast.ts                # Toast notification hook
```

### Utilities & Logic
```
lib/
├── data.ts                     # 🔑 CORE: Forecasting logic, historical data, report generation
├── queryClient.ts              # React Query configuration
└── utils.ts                    # Utility functions (cn, classname merging)
```

### Entry Points
```
main.tsx                        # React DOM entry point
index.css                       # 🎨 Global styles, Tailwind @theme, CSS variables
App.tsx                         # Router and app wrapper
index.html                      # HTML template
```

---

## ASSETS

```
attached_assets/
└── generated_images/
    └── industrial_factory_at_sunset_with_clean_energy_visualizations.png
```

---

## BACKEND (Optional - Not Used in Mockup Mode)

```
server/
├── index.ts                    # Express server entry
├── routes.ts                   # API route definitions
├── storage.ts                  # Data persistence layer
├── static.ts                   # Static file serving
└── vite.ts                     # Vite integration

shared/
└── schema.ts                   # Shared type definitions
```

---

## BUILD & SCRIPTS

```
script/
└── build.ts                    # Production build script
```

---

## DOCUMENTATION

```
README.md                       # Feature overview & API docs
SETUP_GUIDE.md                  # Local development guide
INSTALLATION.md                 # Installation & quick start
FILES_REFERENCE.md              # This file - complete file listing
```

---

## FILE COUNT SUMMARY

| Category | Count |
|----------|-------|
| TypeScript/React Components | 70+ |
| Shadcn/UI Components | 55 |
| Custom Pages | 2 |
| Custom Layout Components | 2 |
| Custom Dashboard Widgets | 3 |
| Hooks | 2 |
| Utilities | 3 |
| **Total Frontend Files** | **~65** |
| Config Files | 8 |
| Documentation | 4 |
| **Total Project Files** | **~77** |

---

## KEY FILES TO MODIFY

### For Forecasting Logic
**File**: `client/src/lib/data.ts`
- `historicalData` array - Historical emissions data
- `generateForecast()` function - Prediction algorithm
- `generateReport()` function - AI-generated insights

### For Styling & Theme
**File**: `client/src/index.css`
- `:root` section - Light mode colors
- `.dark` section - Dark mode colors
- CSS variables for colors, fonts, spacing

### For Dashboard Layout
**File**: `client/src/pages/dashboard.tsx`
- Overall dashboard structure
- Component arrangement
- Hero header

### For Sidebar Navigation
**File**: `client/src/components/layout/sidebar.tsx`
- Navigation items
- Logo and branding

### For Charts & Visualization
**File**: `client/src/components/dashboard/emissions-chart.tsx`
- Chart configuration
- Data visualization logic
- Tooltip and legend

### For KPI Metrics
**File**: `client/src/components/dashboard/overview-metrics.tsx`
- Metric cards
- Calculations and formatting

### For AI Insights
**File**: `client/src/components/dashboard/report-view.tsx`
- Report template
- Recommendation display

### For Routing
**File**: `client/src/App.tsx`
- Route definitions
- Page imports

---

## DEPENDENCIES BREAKDOWN

### Core Framework
- `react` - UI library
- `react-dom` - React DOM rendering
- `typescript` - Type safety

### Styling
- `tailwindcss` - Utility-first CSS
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes
- `class-variance-authority` - Component variant management
- `clsx` - Conditional classnames
- `tailwind-merge` - Merge Tailwind classes intelligently

### UI Components
- `@radix-ui/*` - 30+ unstyled component primitives
- `lucide-react` - Icon library
- `framer-motion` - Animation library

### Forms & Validation
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod resolver for react-hook-form

### Data & Queries
- `@tanstack/react-query` - Server state management
- `recharts` - Chart visualization library

### Routing
- `wouter` - Lightweight client-side router

### Utilities
- `date-fns` - Date manipulation
- `sonner` - Toast notifications
- `next-themes` - Theme management

### Build Tools
- `vite` - Frontend build tool
- `esbuild` - JavaScript bundler
- `@vitejs/plugin-react` - React support
- `@tailwindcss/vite` - Tailwind CSS v4 plugin
- `@replit/vite-plugin-*` - Replit integration plugins

### Type Definitions
- `@types/*` - TypeScript types for packages

---

## NPM SCRIPTS

Run these from the project root:

```bash
npm run dev:client              # Start Vite dev server (http://localhost:5000)
npm run check                   # TypeScript type checking
npm run build                   # Production build
npm start                       # Run production server
npm run db:push                 # Push database schema (optional)
```

---

## QUICK FILE LOCATIONS

| Need | File |
|------|------|
| Change emission data | `client/src/lib/data.ts` |
| Modify forecast logic | `client/src/lib/data.ts` |
| Update theme colors | `client/src/index.css` |
| Add new page | `client/src/pages/new-page.tsx` + `client/src/App.tsx` |
| Modify dashboard | `client/src/pages/dashboard.tsx` |
| Add navigation item | `client/src/components/layout/sidebar.tsx` |
| Customize chart | `client/src/components/dashboard/emissions-chart.tsx` |
| Change styling | `client/src/index.css` or individual component files |
| Add chart data | `client/src/lib/data.ts` - historicalData array |

---

## PRODUCTION BUILD OUTPUT

After running `npm run build`:

```
dist/
└── public/
    ├── index.html              # Minified HTML
    ├── assets/
    │   ├── *.js                # Bundled JavaScript
    │   └── *.css               # Bundled CSS
    └── favicon.png             # Icon
```

Ready to serve as static files!

---

## How to Use This Reference

1. **Finding a file?** → Use Ctrl+F to search this document
2. **Need to edit something?** → See "QUICK FILE LOCATIONS" table
3. **Want to add a feature?** → Check relevant file category above
4. **Understanding structure?** → Review "FILE COUNT SUMMARY"

---

## Archive Extraction

```bash
# macOS/Linux
tar -xzf emissions-forecast.tar.gz
cd emissions-forecast
npm install
npm run dev:client

# Windows (Git Bash)
tar -xzf emissions-forecast.tar.gz
cd emissions-forecast
npm install
npm run dev:client

# Windows (using 7-Zip or WinRAR)
# Right-click → Extract
# Double-click extracted .tar → Extract again
# Open terminal in that folder
# npm install && npm run dev:client
```

---

**Total Download Size**: 1.8 MB compressed (expands to ~150-200 MB with node_modules after `npm install`)

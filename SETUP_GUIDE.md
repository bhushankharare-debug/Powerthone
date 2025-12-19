# Complete Setup Guide for Local Development

## Step 1: Extract the Project

Unzip the `Data-Predictor.zip` file to your desired location:

```bash
unzip Data-Predictor.zip
cd Data-Predictor
```

## Step 2: Install Node.js (if not already installed)

Download from https://nodejs.org/ (LTS version recommended)

Verify installation:
```bash
node --version
npm --version
```

## Step 3: Install Dependencies

```bash
npm install
```

This will install all packages listed in `package.json`. The installation may take 2-5 minutes depending on your internet speed.

## Step 4: Start Development Server

```bash
npm run dev:client
```

Expected output:
```
  VITE v7.1.9  ready in XXX ms

  ➜  Local:   http://localhost:5000/
  ➜  press h to show help
```

## Step 5: Open in Browser

Navigate to http://localhost:5000 in your web browser.

You should see the **Emissions Forecasting Dashboard** with:
- Hero header with manufacturing image
- KPI cards (Total Emissions, Intensity, Forecast Accuracy)
- Scenario selector dropdown
- Interactive emissions chart
- AI-generated insights panel

## Step 6: Interact with the Dashboard

### Try Different Scenarios

1. Click the **"Select Scenario"** dropdown
2. Choose:
   - **Business As Usual** - See emissions rising with growth
   - **Moderate Transition** - See gradual emission reductions
   - **Aggressive / Net Zero** - See steep decarbonization curve

3. Watch the chart and report update automatically

### Explore the Data

- Hover over the chart to see exact emissions values
- Check the "AI Generated Insights" panel for scenario-specific recommendations
- Review the KPI cards for current year metrics

## File Organization

```
emissions-forecast/
│
├── 📄 package.json                 # Project dependencies & scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 vite.config.ts               # Vite build configuration
├── 📄 postcss.config.js            # PostCSS plugins
├── 📄 components.json              # Shadcn/UI configuration
│
├── 📁 client/                      # Frontend application
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn/UI components (cards, buttons, etc.)
│   │   │   ├── layout/
│   │   │   │   ├── sidebar.tsx     # Left navigation bar
│   │   │   │   └── shell.tsx       # Main app wrapper
│   │   │   └── dashboard/
│   │   │       ├── emissions-chart.tsx      # Main forecast visualization
│   │   │       ├── overview-metrics.tsx     # Top KPI cards
│   │   │       └── report-view.tsx          # Right panel with insights
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/
│   │   │   ├── data.ts             # 🔑 Forecasting logic & historical data
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── dashboard.tsx       # Main page (what you see)
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── App.tsx                 # Router & main app setup
│   │   ├── main.tsx                # React DOM entry point
│   │   └── index.css               # Global styles & theme
│   └── index.html                  # HTML template
│
├── 📁 attached_assets/
│   └── generated_images/           # Hero background image
│
├── 📁 shared/                      # Shared TypeScript types
├── 📁 server/                      # Backend (not used in mockup mode)
│
├── README.md                       # Main documentation
└── SETUP_GUIDE.md                 # This file
```

## Key Files to Modify

### To Change Colors/Theme
Edit `client/src/index.css` - Look for `:root` section

### To Change Forecasting Logic
Edit `client/src/lib/data.ts` - Functions: `generateForecast()`, `generateReport()`

### To Add New Pages
1. Create file in `client/src/pages/my-page.tsx`
2. Add route in `client/src/App.tsx`

### To Change Dashboard Layout
Edit `client/src/pages/dashboard.tsx`

## Running Commands

### Development
```bash
npm run dev:client          # Start dev server (http://localhost:5000)
```

### Production
```bash
npm run build              # Build optimized version
npm start                  # Run production build
```

### Validation
```bash
npm run check              # Type check with TypeScript
```

## Troubleshooting

### Issue: "Port 5000 is already in use"
**Solution**: Edit `vite.config.ts` and change the port:
```typescript
server: {
  port: 3000,  // or any other available port
}
```

### Issue: "Module not found" errors
**Solution**: 
```bash
rm -rf node_modules
npm install
```

### Issue: Chart not displaying
**Solution**: 
- Press F12 to open Developer Tools
- Check Console tab for errors
- Try clearing cache: Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: Styles look broken
**Solution**:
```bash
npm run check              # Verify TypeScript
npm run dev:client         # Restart server
# Or clear .vite cache:
rm -rf .vite
```

## VS Code Extensions (Optional but Recommended)

1. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
2. **TypeScript Vue Plugin** - Better TypeScript support
3. **ES7+ React/Redux/React-Native snippets** - Quick code generation
4. **Prettier** - Code formatter

To install in VS Code:
- Open Extensions (Ctrl+Shift+X)
- Search for extension name
- Click Install

## Next Steps

### Modify Forecasting Logic
Open `client/src/lib/data.ts` and adjust:
- `productionGrowth` variable (line ~22)
- Scope-specific changes in the `switch` statement (lines ~31-60)

### Add Your Own Data
Replace the `historicalData` array in `client/src/lib/data.ts` with your company's actual emissions data

### Connect to Backend
When ready, connect to a real API by modifying the data loading in `dashboard.tsx`

### Customize Colors
Edit CSS variables in `client/src/index.css`:
- `--chart-1`: Scope 1 color (orange)
- `--chart-2`: Scope 2 color (teal)
- `--chart-3`: Scope 3 color (blue-grey)

## Need Help?

1. Check **README.md** for feature documentation
2. Review `client/src/lib/data.ts` for data structure
3. Check browser console (F12 → Console) for error messages
4. Verify Node.js version: `node --version` (should be 18+)

## Quick Reference: Scenario Logic

The forecasting model uses different annual change rates:

| Scope | Metric | BAU | Moderate | Aggressive |
|-------|--------|-----|----------|-----------|
| 1 | Direct Emissions | +1.5% | -1.0% | -8% |
| 2 | Electricity | +1.0% | -2.0% | -15% |
| 3 | Supply Chain | +2.0% | -0.5% | -5% |
| - | Production | +2.0% | +2.0% | +2.0% |

These rates are applied annually over a 30-year forecast horizon.

---

**Happy forecasting!** 🚀

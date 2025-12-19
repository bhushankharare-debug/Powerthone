# Installation & Quick Start Guide

## Download & Extract

The project archive is available as `emissions-forecast.tar.gz` (1.8 MB)

### On macOS/Linux:
```bash
# Extract the archive
tar -xzf emissions-forecast.tar.gz
cd emissions-forecast

# Install dependencies
npm install

# Start development server
npm run dev:client
```

**The app will be available at: http://localhost:5000**

### On Windows (Git Bash / WSL):
```bash
# Extract using tar (available in Git Bash or WSL)
tar -xzf emissions-forecast.tar.gz
cd Data-Predictor

# Install dependencies
npm install

# Start development server
npm run dev:client
```

### On Windows (Standard):
1. Download and install **7-Zip** or **WinRAR** (if not already installed)
2. Right-click `emissions-forecast.tar.gz` → Extract to folder
3. Then right-click the extracted `.tar` file → Extract again
4. Open terminal/PowerShell and navigate to the extracted folder:
   ```powershell
   cd emissions-forecast
   npm install
   npm run dev:client
   ```

---

## What's Included

✅ Complete React application with TypeScript  
✅ AI emissions forecasting engine  
✅ Interactive dashboard with charts  
✅ All configuration files (Tailwind, Vite, TypeScript)  
✅ Documentation and guides  

❌ NOT included (will be installed via npm install):  
- `node_modules/` (~500 MB - auto-generated)

---

## Complete File Structure

```
emissions-forecast/
├── 📄 package.json                    # Dependencies & scripts
├── 📄 tsconfig.json                   # TypeScript config
├── 📄 vite.config.ts                  # Build config
├── 📄 components.json                 # Shadcn/UI config
├── 📄 drizzle.config.ts               # Database config (optional)
├── 📄 postcss.config.js               # CSS processing
├── 📄 vite-plugin-meta-images.ts      # Vite plugin
│
├── 📁 client/                         # ← FRONTEND (What you see)
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # Reusable UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── ... (more shadcn components)
│   │   │   ├── layout/
│   │   │   │   ├── sidebar.tsx        # Navigation sidebar
│   │   │   │   └── shell.tsx          # Main layout wrapper
│   │   │   └── dashboard/
│   │   │       ├── emissions-chart.tsx       # Stacked area chart
│   │   │       ├── overview-metrics.tsx      # KPI cards
│   │   │       └── report-view.tsx           # AI insights panel
│   │   ├── hooks/
│   │   │   └── use-mobile.tsx
│   │   ├── lib/
│   │   │   ├── data.ts                # 🔑 FORECAST LOGIC & DATA
│   │   │   ├── queryClient.ts         # React Query setup
│   │   │   └── utils.ts               # Helper functions
│   │   ├── pages/
│   │   │   ├── dashboard.tsx          # Main dashboard page
│   │   │   └── not-found.tsx          # 404 page
│   │   ├── App.tsx                    # Router & app wrapper
│   │   ├── main.tsx                   # Entry point
│   │   └── index.css                  # 🎨 Global styles & theme
│   └── index.html                     # HTML template
│
├── 📁 attached_assets/                # Generated images
│   └── generated_images/
│       └── industrial_factory_*.png   # Hero image
│
├── 📁 shared/                         # Shared types (for backend)
│   └── schema.ts
│
├── 📁 server/                         # Backend (not used in mockup)
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   ├── static.ts
│   └── vite.ts
│
├── 📁 script/
│   └── build.ts                       # Build script
│
├── 📄 README.md                       # Feature documentation
├── 📄 SETUP_GUIDE.md                  # Local development guide
├── 📄 INSTALLATION.md                 # This file
└── 📄 .gitignore                      # Git ignore rules
```

---

## System Requirements

- **Node.js**: 18.0.0 or higher (LTS recommended)
- **npm**: 9.0.0 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB for node_modules

### Check Your Versions

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

### Update Node.js

If you have an older version, download from https://nodejs.org/

---

## Typical Issues & Solutions

### Issue: "npm: command not found"
- **Solution**: Node.js not installed. Download from https://nodejs.org/

### Issue: "Port 5000 is already in use"
- **Solution**: Edit `vite.config.ts`, change `port: 5000` to `port: 3000`

### Issue: "Module not found" after extraction
- **Solution**: 
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Issue: Chart not rendering
- **Solution**: 
  - Clear browser cache (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
  - Check Developer Console (F12 → Console)

---

## First Steps After Running

1. **Open http://localhost:5000 in your browser**

2. **You should see**:
   - Left sidebar with "ZeroCarbon AI" logo
   - Header with manufacturing facility image
   - Three KPI cards at top
   - Large interactive chart
   - Right panel with "AI Generated Insights"

3. **Try these interactions**:
   - Click "Select Scenario" dropdown to switch between BAU, Moderate, Aggressive
   - Hover over the chart to see exact emissions values
   - Scroll down in the insights panel to read recommendations
   - Click "Reset Model" button to restart

---

## File Customization Quick Reference

### Change Forecast Logic
Edit `client/src/lib/data.ts`

```typescript
// Line ~22: Adjust production growth
const productionGrowth = 0.02; // Change to 0.03 for 3% growth

// Lines ~31-60: Adjust scenario parameters
s1Change = 0.015;  // Scope 1 annual change rate
```

### Change Dashboard Title/Colors
Edit `client/src/index.css`

```css
/* Around line 36-43: Change primary color */
--primary: 221 83% 53%;     /* Blue */
/* Change to: */
--primary: 356 100% 58%;    /* Red */
```

### Add New Pages
1. Create `client/src/pages/my-page.tsx`
2. Add route to `client/src/App.tsx`:
   ```tsx
   import MyPage from "@/pages/my-page";
   // In Router component:
   <Route path="/my-page" component={MyPage} />
   ```

### Update Historical Data
Edit `client/src/lib/data.ts` - replace `historicalData` array

---

## Available npm Commands

```bash
# Development
npm run dev:client              # Start Vite dev server (http://localhost:5000)

# Production
npm run build                   # Build optimized bundle
npm start                       # Run production server

# Validation
npm run check                   # TypeScript type checking

# Database (optional, not used in mockup mode)
npm run db:push                 # Push schema to database
```

---

## Project Dependencies Overview

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `typescript` | Type safety |
| `tailwindcss` | Styling |
| `recharts` | Charts & visualizations |
| `wouter` | Client-side routing |
| `react-hook-form` | Form management |
| `shadcn/ui` | Pre-built components |
| `lucide-react` | Icons |
| `zod` | Data validation |
| `framer-motion` | Animations |

All dependencies are declared in `package.json` and will be installed automatically by `npm install`.

---

## Next Steps

### Short-term
1. ✅ Extract and run locally
2. ✅ Explore the dashboard
3. ✅ Try different scenarios

### Medium-term
1. Replace mock data with real emissions data
2. Customize forecasting logic for your company
3. Adjust colors and branding
4. Add your company logo

### Long-term
1. Connect to a backend API
2. Add authentication/user accounts
3. Add database persistence
4. Export reports as PDF
5. Add more forecasting scenarios

---

## Getting Help

1. **Check the logs**: F12 → Console → Look for red errors
2. **Read README.md** for feature documentation
3. **Review SETUP_GUIDE.md** for development tips
4. **Check client/src/lib/data.ts** for forecasting logic

---

## Environment Setup Summary

```bash
# 1. Extract
tar -xzf emissions-forecast.tar.gz && cd emissions-forecast

# 2. Install
npm install

# 3. Run
npm run dev:client

# 4. Open
# → http://localhost:5000
```

That's it! Your dashboard should be live. 🚀

---

**For questions about specific features, see README.md**
**For development tips, see SETUP_GUIDE.md**

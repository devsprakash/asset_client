# Asset Inspection Dashboard – React + MUI

Full-screen admin dashboard converted from HTML/Tailwind/Chart.js to React + Material UI + Recharts.

## 📁 Project Structure

```
assetinspection/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── index.jsx                        # React entry point
    ├── App.jsx                          # Root – imports and connects all components
    └── components/
        ├── Sidebar.jsx                  # Left nav: logo, 6 nav items with active state, logout
        ├── TopHeader.jsx                # Top bar: search, notification badge, user avatar
        ├── StatsGrid.jsx                # 4 gradient stat cards with trend indicators
        ├── CustomerActivityChart.jsx    # Bar chart – Active vs Inactive customers (Recharts)
        ├── FormUsageChart.jsx           # Line chart – Forms Created vs Submitted (Recharts)
        ├── SalesOverview.jsx            # Area chart – monthly sales trend (Recharts)
        └── RevenueDistribution.jsx      # Donut/Pie chart – regional revenue (Recharts)
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🎨 Theme

- **Primary**: `#0f4c61` (dark teal)
- **Secondary**: `#177e89` (lighter teal)
- **Background**: `#f9fafc`
- **Font**: Inter via @fontsource/inter

## 📊 Charts (Recharts)

Replaces Chart.js with fully React-native Recharts:
- `BarChart` → Customer Activity (grouped bars)
- `LineChart` → Form Usage Trend (smooth curves)
- `AreaChart` → Sales Overview (gradient fill)
- `PieChart` → Revenue Distribution (donut with legend)

## 📦 Dependencies

- `react` + `react-dom` ^18
- `@mui/material` + `@mui/icons-material` ^5
- `@emotion/react` + `@emotion/styled`
- `@fontsource/inter`
- `recharts` ^2
- `vite` + `@vitejs/plugin-react`

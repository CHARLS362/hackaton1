# **App Name**: SIGA-Titicaca

## Core Features:

- Real-Time Environmental Monitoring: Display real-time sensor data for various environmental parameters of Lake Titicaca, visualized on a map.
- Trend Analysis Dashboard: Provide historical data visualizations for key parameters, allowing users to analyze trends and patterns over time using the TrendAnalysisCard Component.
- Citizen Reporting System: Enable citizens to report environmental incidents with location and photos using a step-by-step CitizenReportForm. The report data can later be reviewed by a human operator.
- Automated Alert Notifications: Deliver real-time alerts and notifications based on sensor data and citizen reports using AlertsPanel to notify users about critical environmental issues, providing warnings when data exceeds expected safe values.
- Admin Project Management: Facilitate administrative tasks such as cleanup and conservation with a ProjectsDataTable with a CRUD interface for managing tasks and assigning staff.

## Style Guidelines:

- Primary color: Deep blues and turquoises (#4338CA to #22D3EE) representing the water.
- Background color: Clean white or slate-50 (#F8FAFC) for light sections; slate-900 (#0F172A) for high-impact dark sections.
- Accent color: Vibrant orange or amber (#F59E0B) for alerts and actions.
- Body and headline font: 'Inter', a modern sans-serif font. Note: currently only Google Fonts are supported.
- Use 'Lucide React' library to include modern icons with clean lines.
- Employ a 'Clean Tech' UI style with soft shadows (shadow-lg), subtle borders (border-slate-200), glassmorphism effects (backdrop-blur), and rounded corners (rounded-xl).
- Incorporate subtle hover effects and transitions to enhance user experience without being distracting.
# Deploying to Netlify with Live Stock Data

## Prerequisites
1. Get a free Alpha Vantage API key: https://www.alphavantage.co/support/#api-key
2. GitHub account

## Deployment Steps

### 1. Upload to GitHub
1. Create a new repository on GitHub
2. Upload all project files to the repository

### 2. Deploy to Netlify
1. Go to https://netlify.com and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository
4. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty)

### 3. Configure Environment Variables
1. In Netlify dashboard, go to Site settings → Environment variables
2. Add: `ALPHA_VANTAGE_API_KEY` with your API key value

### 4. Custom Domain (Optional)
1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Follow DNS configuration instructions

## Files Required for Netlify
- `index.html` - Main page
- `style.css` - Styling
- `script.js` - JavaScript (modified for Netlify)
- `assets/` - Logo and profile image
- `netlify/functions/stocks.js` - Stock data function
- `netlify.toml` - Netlify configuration

## How It Works
- Netlify Functions handle API calls server-side
- Your API key stays secure (not exposed to browsers)
- Stock data updates every 5 minutes
- Falls back to demo data if API fails
- Completely free hosting with custom domain support

## Cost: $0
Everything runs on Netlify's free tier!
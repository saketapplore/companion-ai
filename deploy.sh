#!/bin/bash

# Admin Panel Deployment Script
# This script helps deploy the admin panel to Vercel

echo "🚀 AI Companion Admin Panel Deployment"
echo "========================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel:"
    vercel login
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Ask for API URL
read -p "Enter your backend API URL (e.g., https://your-app.herokuapp.com/api/v1): " API_URL

if [ -z "$API_URL" ]; then
    echo "⚠️  No API URL provided. Using default: http://localhost:8000/api/v1"
    API_URL="http://localhost:8000/api/v1"
fi

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

# Set environment variable
echo ""
echo "🔧 Setting environment variable..."
vercel env add VITE_API_BASE_URL production <<< "$API_URL"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Visit your Vercel dashboard to get the deployment URL"
echo "2. Test the admin panel login"
echo "3. Verify API calls are working"
echo ""


#!/bin/bash

echo "🚀 Deploying FitApp to Vercel..."

# Build the web version
echo "📦 Building for web..."
npm run build:web

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    echo "Please login to Vercel if prompted..."
    vercel --prod
    
    echo "🎉 Deployment complete!"
    echo "Your app should be live at the URL provided above."
    echo ""
    echo "�� Next steps:"
    echo "1. Add your Firebase environment variables in Vercel dashboard"
    echo "2. Add your Google OAuth credentials in Vercel dashboard"
    echo "3. Test the deployed app"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

#!/bin/bash

echo "🌐 FitApp Web Build Script"
echo "==========================="

# Build the web version
echo "📦 Building for web..."
npm run build:web

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Web build successful!"
    
    # Ask if user wants to deploy
    echo ""
    read -p "Do you want to deploy to Vercel? (y/n): " deploy_choice
    
    if [[ $deploy_choice =~ ^[Yy]$ ]]; then
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        echo "🎉 Web deployment complete!"
    else
        echo "📁 Build files are available in the 'dist' directory"
        echo "You can deploy them manually or run './deploy.sh web' later"
    fi
else
    echo "❌ Web build failed. Please check the errors above."
    exit 1
fi


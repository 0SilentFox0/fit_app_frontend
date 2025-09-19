#!/bin/bash

# Function to display usage
show_usage() {
    echo "Usage: $0 [web|mobile|all]"
    echo ""
    echo "Options:"
    echo "  web     - Build and deploy web version to Vercel"
    echo "  mobile  - Build mobile app for iOS and Android"
    echo "  all     - Build both web and mobile versions"
    echo ""
}

# Check if argument is provided
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

PLATFORM=$1

case $PLATFORM in
    "web")
        echo "🌐 Building and deploying web version..."
        
        # Build the web version
        echo "📦 Building for web..."
        npm run build:web
        
        # Check if build was successful
        if [ $? -eq 0 ]; then
            echo "✅ Web build successful!"
            
            # Deploy to Vercel
            echo "🚀 Deploying to Vercel..."
            vercel --prod
            
            echo "🎉 Web deployment complete!"
            echo "Your web app should be live at the URL provided above."
        else
            echo "❌ Web build failed. Please check the errors above."
            exit 1
        fi
        ;;
        
    "mobile")
        echo "📱 Building mobile app..."
        
        # Check if EAS CLI is installed
        if ! command -v eas &> /dev/null; then
            echo "❌ EAS CLI not found. Please install it first:"
            echo "npm install -g eas-cli"
            exit 1
        fi
        
        # Login to EAS if not already logged in
        echo "🔐 Checking EAS authentication..."
        eas whoami > /dev/null 2>&1
        if [ $? -ne 0 ]; then
            echo "Please login to EAS:"
            eas login
        fi
        
        # Initialize EAS project if needed
        if [ ! -f "eas.json" ]; then
            echo "📋 Initializing EAS project..."
            eas build:configure
        fi
        
        # Build for both platforms
        echo "🏗️  Building for iOS and Android..."
        eas build --platform all
        
        echo "🎉 Mobile build complete!"
        echo "Check your EAS dashboard for build status and download links."
        ;;
        
    "all")
        echo "🚀 Building and deploying both web and mobile..."
        
        # Build web
        echo "🌐 Building web version..."
        npm run build:web
        
        if [ $? -eq 0 ]; then
            echo "✅ Web build successful!"
            echo "🚀 Deploying web to Vercel..."
            vercel --prod
            echo "🎉 Web deployment complete!"
        else
            echo "❌ Web build failed."
        fi
        
        # Build mobile
        echo "📱 Building mobile app..."
        if command -v eas &> /dev/null; then
            eas build --platform all
            echo "🎉 Mobile build complete!"
        else
            echo "❌ EAS CLI not found. Please install it first:"
            echo "npm install -g eas-cli"
        fi
        ;;
        
    *)
        echo "❌ Invalid option: $PLATFORM"
        show_usage
        exit 1
        ;;
esac
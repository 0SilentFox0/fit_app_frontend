#!/bin/bash

echo "📱 FitApp Mobile Build Script"
echo "=============================="

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if user is logged in
echo "🔐 Checking EAS authentication..."
if ! eas whoami > /dev/null 2>&1; then
    echo "Please login to EAS:"
    eas login
fi

# Initialize EAS project if needed
if [ ! -f "eas.json" ]; then
    echo "📋 Initializing EAS project..."
    eas build:configure
fi

# Show build options
echo ""
echo "Select build type:"
echo "1) Development build (for testing)"
echo "2) Preview build (internal distribution)"
echo "3) Production build (for app stores)"
echo "4) Build for specific platform"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🏗️  Building development version..."
        eas build --profile development --platform all
        ;;
    2)
        echo "🏗️  Building preview version..."
        eas build --profile preview --platform all
        ;;
    3)
        echo "🏗️  Building production version..."
        eas build --profile production --platform all
        ;;
    4)
        echo "Select platform:"
        echo "1) iOS only"
        echo "2) Android only"
        echo "3) Both platforms"
        read -p "Enter platform choice (1-3): " platform_choice
        
        case $platform_choice in
            1)
                eas build --platform ios
                ;;
            2)
                eas build --platform android
                ;;
            3)
                eas build --platform all
                ;;
            *)
                echo "❌ Invalid choice"
                exit 1
                ;;
        esac
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo "🎉 Build process completed!"
echo "Check your EAS dashboard for build status and download links."


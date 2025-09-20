#!/bin/bash

# Script to run both iOS and Web simultaneously
echo "🚀 Starting both iOS and Web development servers..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping all development servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Start web server in background
echo "🌐 Starting Web server on port 8081..."
npx expo start --web --port 8081 &
WEB_PID=$!

# Wait a moment for web server to start
sleep 3

# Start iOS server in background
echo "📱 Starting iOS server on port 8082..."
npx expo start --ios --port 8082 &
IOS_PID=$!

echo "✅ Both servers are running!"
echo "🌐 Web: http://localhost:8081"
echo "📱 iOS: http://localhost:8082"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait

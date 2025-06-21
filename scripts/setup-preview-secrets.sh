#!/bin/bash

# Script to set up secrets for the preview environment
# Run this after deploying the preview environment for the first time

echo "Setting up secrets for preview environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please create a .env file with your environment variables:"
    echo "GOOGLE_CLIENT_ID=your_client_id"
    echo "AUTH_SECRET=your_auth_secret"
    echo "GOOGLE_CLIENT_SECRET=your_client_secret"
    exit 1
fi

# Load environment variables from .env file
export $(cat .env | grep -v '^#' | xargs)

# Set secrets for the preview environment
echo "Setting GOOGLE_CLIENT_ID..."
echo "$GOOGLE_CLIENT_ID" | npx wrangler secret put GOOGLE_CLIENT_ID --env preview

echo "Setting AUTH_SECRET..."
echo "$AUTH_SECRET" | npx wrangler secret put AUTH_SECRET --env preview

echo "Setting GOOGLE_CLIENT_SECRET..."
echo "$GOOGLE_CLIENT_SECRET" | npx wrangler secret put GOOGLE_CLIENT_SECRET --env preview

echo "Preview environment secrets configured!"
echo "You can verify with: npx wrangler secret list --env preview" 

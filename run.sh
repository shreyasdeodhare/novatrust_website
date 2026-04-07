#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}   NovaTrust Chit Fund Application    ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed.${NC}"
    echo -e "Please install Node.js from https://nodejs.org/ (version 14 or later)"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo -e "${YELLOW}Warning: You are using Node.js v$(node -v).${NC}"
    echo -e "${YELLOW}It's recommended to use Node.js v14 or later.${NC}"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    echo -e "npm should be included with Node.js installation."
    exit 1
fi

echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating sample .env file...${NC}"
    echo "REACT_APP_SUPABASE_URL=your_supabase_url" > .env
    echo "REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env
    echo -e "${YELLOW}Please update the .env file with your Supabase credentials.${NC}"
fi

echo -e "${GREEN}Starting the development server...${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "${GREEN}The application will be available at:${NC}"
echo -e "${BLUE}http://localhost:3000${NC}"
echo -e "${BLUE}=======================================${NC}"

npm start

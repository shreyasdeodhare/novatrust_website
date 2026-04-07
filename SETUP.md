# NovaTrust Chit Fund - Setup Guide

This guide will help you set up and run the NovaTrust Chit Fund application on your local machine.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git

## Installation Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd novatrust-chitfund
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following content:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
novatrust-chitfund/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── landing/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   └── index.tsx
└── package.json
```

## Setting Up Supabase (Database & Authentication)

1. Create a free account at [Supabase](https://supabase.io)
2. Create a new project
3. Get your project URL and anon key from the project settings
4. Add these to your `.env` file
5. Use the SQL scripts in the `database` folder to set up your tables

## Running in Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `build` folder with optimized production files.

## Troubleshooting

- If you encounter any issues with dependencies, try deleting the `node_modules` folder and running `npm install` again.
- Make sure your Node.js version is compatible (v14 or later).
- Check that your Supabase credentials are correct in the `.env` file.

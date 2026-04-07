# NovaTrust Chit Fund Services

A modern, responsive web application for managing chit funds with user authentication, OTP verification, and fund tracking.

## Features

- **User Authentication**: Secure login and signup with OTP verification
- **Dashboard**: Track your chit funds, payments, and progress
- **Fund Management**: Create new chit funds or join existing ones
- **Payment Tracking**: Monitor your payment history and upcoming payments
- **Analytics**: Visualize your chit fund data with interactive charts
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- Chart.js
- Supabase (for authentication and database)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/novatrust-chitfund.git
   cd novatrust-chitfund
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

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
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── OtpVerificationPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ManageFundPage.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   └── fundService.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Database Schema

The application uses the following database schema in Supabase:

1. **users**: Stores user information
   - id (UUID, primary key)
   - email (text, unique)
   - phone (text)
   - full_name (text)
   - created_at (timestamp)

2. **chit_funds**: Stores chit fund information
   - id (UUID, primary key)
   - name (text)
   - total_amount (numeric)
   - duration_months (integer)
   - monthly_contribution (numeric)
   - start_date (date)
   - created_at (timestamp)
   - created_by (UUID, foreign key to users.id)

3. **chit_fund_members**: Stores chit fund membership information
   - id (UUID, primary key)
   - chit_fund_id (UUID, foreign key to chit_funds.id)
   - user_id (UUID, foreign key to users.id)
   - joined_at (timestamp)

4. **payments**: Stores payment information
   - id (UUID, primary key)
   - chit_fund_id (UUID, foreign key to chit_funds.id)
   - user_id (UUID, foreign key to users.id)
   - amount (numeric)
   - payment_date (date)
   - month_number (integer)
   - status (text: 'pending', 'paid', 'overdue')
   - created_at (timestamp)

5. **auctions**: Stores auction information
   - id (UUID, primary key)
   - chit_fund_id (UUID, foreign key to chit_funds.id)
   - month_number (integer)
   - auction_date (date)
   - winner_id (UUID, foreign key to users.id)
   - winning_bid (numeric)
   - status (text: 'scheduled', 'completed', 'cancelled')

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Chart.js](https://www.chartjs.org/)
- [React Router](https://reactrouter.com/)

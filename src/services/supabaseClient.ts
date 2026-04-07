import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema setup instructions:
/*
1. Create 'users' table:
   - id: uuid (primary key)
   - email: text (unique)
   - phone: text
   - full_name: text
   - created_at: timestamp with time zone

2. Create 'chit_funds' table:
   - id: uuid (primary key)
   - name: text
   - total_amount: numeric
   - duration_months: integer
   - monthly_contribution: numeric
   - start_date: date
   - created_at: timestamp with time zone
   - created_by: uuid (foreign key to users.id)

3. Create 'chit_fund_members' table:
   - id: uuid (primary key)
   - chit_fund_id: uuid (foreign key to chit_funds.id)
   - user_id: uuid (foreign key to users.id)
   - joined_at: timestamp with time zone

4. Create 'payments' table:
   - id: uuid (primary key)
   - chit_fund_id: uuid (foreign key to chit_funds.id)
   - user_id: uuid (foreign key to users.id)
   - amount: numeric
   - payment_date: date
   - month_number: integer
   - status: text (enum: 'pending', 'paid', 'overdue')
   - created_at: timestamp with time zone

5. Create 'auctions' table:
   - id: uuid (primary key)
   - chit_fund_id: uuid (foreign key to chit_funds.id)
   - month_number: integer
   - auction_date: date
   - winner_id: uuid (foreign key to users.id)
   - winning_bid: numeric
   - status: text (enum: 'scheduled', 'completed', 'cancelled')
*/

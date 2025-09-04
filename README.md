# TradingSim Platform

A modern, responsive full-stack trading platform built with Next.js, Supabase, and TailwindCSS. This application provides a complete trading experience with portfolio management, transaction tracking, and real-time analytics.

## 🚀 Features

### Authentication System
- **Secure Login/Signup** with Supabase Auth
- **Password Reset** functionality via email
- **Session Management** with automatic token refresh
- **Protected Routes** with middleware authentication
- **Demo Account** available for testing

### Dashboard & Portfolio
- **Portfolio Overview** with total value and P&L tracking
- **Investment Table** showing all holdings with real-time data
- **Interactive Charts** for portfolio growth and asset allocation
- **Recent Activity Feed** with transaction history
- **Performance Analytics** with gain/loss calculations

### User Management
- **Profile Settings** with avatar upload
- **Password Management** and security settings
- **Notification Preferences** customization
- **Dark/Light Mode** toggle support

### Advanced Features
- **Search & Filter** investments and transactions
- **CSV Export** for transaction history
- **Responsive Design** optimized for all devices
- **Modern Fintech UI** with glassmorphism effects
- **Real-time Updates** and notifications

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.4.7 (App Router) + React + TypeScript
- **Styling:** TailwindCSS with custom fintech theme
- **Backend:** Supabase (Auth + PostgreSQL + Storage)
- **Charts:** Recharts for data visualization
- **Deployment:** Vercel (serverless)
- **Security:** Row-Level Security (RLS) policies

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Git for version control

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trading-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env

   ```

4. **Database Setup**
   
   Run the SQL setup script in your Supabase dashboard:
   ```sql
   -- Enable Row Level Security
   ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
   
   -- Create custom tables
   CREATE TABLE public.investments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     stock_name VARCHAR(100) NOT NULL,
     quantity INTEGER NOT NULL,
     buy_price DECIMAL(10,2) NOT NULL,
     buy_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   CREATE TABLE public.transactions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     stock_name VARCHAR(100) NOT NULL,
     action VARCHAR(10) CHECK (action IN ('buy', 'sell')) NOT NULL,
     quantity INTEGER NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   CREATE TABLE public.portfolio (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     total_value DECIMAL(12,2) DEFAULT 0,
     gain_loss DECIMAL(12,2) DEFAULT 0,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Enable RLS Policies
   ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
   
   -- Create RLS policies
   CREATE POLICY "Users can view own investments" ON public.investments
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert own investments" ON public.investments
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can view own transactions" ON public.transactions
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert own transactions" ON public.transactions
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can view own portfolio" ON public.portfolio
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can update own portfolio" ON public.portfolio
     FOR ALL USING (auth.uid() = user_id);
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
trading-app/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── login/         # Login page
│   │   ├── signup/        # Registration page
│   │   ├── forgot-password/ # Password reset
│   │   ├── investments/   # Investment management
│   │   ├── transactions/  # Transaction history
│   │   ├── profile/       # User settings
│   │   └── page.tsx      # Dashboard home
│   ├── components/        # Reusable components
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   └── Charts.tsx    # Chart components
│   ├── utils/            # Utility functions
│   │   └── supabase/     # Supabase configuration
│   └── middleware.ts     # Authentication middleware
├── .env.local            # Environment variables
├── tailwind.config.ts    # TailwindCSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Design System

### Color Palette
- **Primary Navy:** `#001f3f` (brand color)
- **Success Green:** `#10b981` (profits, positive actions)
- **Danger Red:** `#ef4444` (losses, negative actions)
- **Background:** `#ffffff` (clean, modern)
- **Text:** `#1f2937` (high contrast)

### UI Components
- **Glassmorphism Effects:** Modern transparent cards with blur
- **Gradient Backgrounds:** Subtle gradients for visual depth
- **Hover Animations:** Smooth transitions and micro-interactions
- **Responsive Grid:** Mobile-first responsive layouts
- **Typography:** Clean, readable font hierarchy

## 🔐 Authentication Flow

### Demo Credentials
For quick testing, use these demo credentials:
- **Email:** demo@tradingsim.co
- **Password:** demo123

### Features
1. **Registration:** Email validation, password strength checking
2. **Login:** Remember me option, error handling
3. **Password Reset:** Email-based reset with secure tokens
4. **Session Management:** Automatic token refresh, secure logout
5. **Route Protection:** Middleware-based authentication

## 📊 Database Schema

### Tables

#### `auth.users` (Supabase Auth)
- User authentication and profile data
- Managed automatically by Supabase

#### `public.investments`
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `stock_name`: Stock symbol/name
- `quantity`: Number of shares owned
- `buy_price`: Purchase price per share
- `buy_time`: Purchase timestamp

#### `public.transactions` 
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `stock_name`: Stock symbol/name
- `action`: 'buy' or 'sell'
- `quantity`: Number of shares
- `price`: Transaction price
- `timestamp`: Transaction time

#### `public.portfolio`
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `total_value`: Current portfolio value
- `gain_loss`: Total profit/loss
- `updated_at`: Last calculation time

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Set Environment Variables**
   In Vercel dashboard, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment
```bash
npm run build
npm run start
```

## 📱 Usage Guide

### Getting Started
1. **Sign Up** for a new account or use demo credentials
2. **Complete Profile** with personal information
3. **Explore Dashboard** to see portfolio overview
4. **View Investments** to track your holdings
5. **Check Transactions** for trading history

### Key Features

#### Dashboard
- Real-time portfolio value and performance
- Interactive charts showing growth trends
- Recent activity feed with latest transactions
- Quick stats: today's P&L, top performers

#### Investment Management
- Detailed holdings table with current prices
- Search and filter functionality
- Performance tracking with color-coded P&L
- Individual stock analysis

#### Transaction History
- Complete trading history with timestamps
- Advanced filtering by date, stock, action
- Sort by various criteria (date, P&L, quantity)
- Export to CSV for record keeping

#### Profile Settings
- Update personal information and preferences
- Change password and security settings
- Upload profile avatar
- Notification preferences management

## 🔒 Security Features

### Authentication Security
- **Supabase Auth:** Enterprise-grade authentication
- **Row-Level Security:** Database-level access control
- **JWT Tokens:** Secure session management
- **Password Hashing:** bcrypt encryption

### Data Protection
- **Environment Variables:** Secure API key management
- **HTTPS Enforcement:** Secure data transmission
- **Input Validation:** XSS and injection protection
- **CORS Configuration:** Cross-origin security

### Privacy
- **User Data Isolation:** RLS ensures data privacy
- **Secure File Upload:** Supabase Storage integration
- **Session Timeout:** Automatic logout for security
- **Audit Trails:** Transaction logging

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Code Quality
- **TypeScript:** Full type safety
- **ESLint:** Code linting and formatting
- **Prettier:** Code formatting
- **Husky:** Git hooks for quality gates

## 🐛 Troubleshooting

### Common Issues

#### Supabase Connection
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### Database Issues
- Ensure RLS policies are correctly configured
- Check user permissions in Supabase dashboard
- Verify table schemas match the application

#### Authentication Problems
- Clear browser cookies and localStorage
- Check Supabase Auth configuration
- Verify email confirmation settings

### Development Tips
- Use browser DevTools to inspect network requests
- Check Supabase logs for database errors
- Monitor console for client-side errors
- Use React DevTools for component debugging

## 📞 Support

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Getting Help
- Check the GitHub Issues for known problems
- Review the troubleshooting section above
- Consult the official documentation for each technology

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

**Built with ❤️ using Next.js and Supabase**

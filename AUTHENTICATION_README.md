# TradeMaster Authentication & Database Guide

This document provides a comprehensive guide to the authentication system and database interactions in the TradeMaster trading platform.

## 🏗️ Architecture Overview

The application uses **Supabase** as the backend service with **Next.js 15 App Router** for a modern, secure authentication system that supports:

- Email/Password authentication
- Session management with automatic refresh
- Server-side rendering (SSR) compatibility
- Row-Level Security (RLS) for data isolation
- Real-time database operations

## 📁 File Structure

```
src/
├── utils/supabase/
│   ├── client.ts          # Browser client configuration
│   ├── server.ts          # Server-side client with cookies
│   └── middleware.ts      # Session refresh middleware
├── middleware.ts          # Global middleware setup
└── app/
    ├── signup/page.tsx    # User registration
    ├── login/page.tsx     # User authentication
    └── forgot-password/page.tsx # Password reset
```

## 🔧 Supabase Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://zttnzwloyjpkcetugjtd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Client Configuration

#### Browser Client (`src/utils/supabase/client.ts`)
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Usage**: Client-side operations like form submissions, real-time subscriptions, and user interactions.

#### Server Client (`src/utils/supabase/server.ts`)
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Component limitation - handled by middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Component limitation - handled by middleware
          }
        },
      },
    }
  )
}
```

**Usage**: Server-side rendering, API routes, and middleware operations.

## 🔐 Authentication Flows

### 1. User Signup

**File**: `src/app/signup/page.tsx`

#### Process Flow:
1. **Form Validation**: Client-side validation for password strength, email format
2. **Password Confirmation**: Ensures passwords match
3. **Terms Agreement**: User must agree to terms and conditions
4. **Supabase Registration**: Creates user account with metadata
5. **Email Confirmation**: Sends verification email

#### Code Implementation:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validation checks
  if (!agreedToTerms) {
    setMessage('Please agree to the terms and conditions');
    return;
  }
  
  if (password !== confirmPassword) {
    setMessage('Passwords do not match');
    return;
  }
  
  if (passwordStrength < 3) {
    setMessage('Please choose a stronger password');
    return;
  }
  
  setIsLoading(true);
  
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Stored in user metadata
        },
      },
    });
    
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Welcome aboard! Please check your email to confirm your account.');
    }
  } catch (error) {
    setMessage('An error occurred during signup');
  } finally {
    setIsLoading(false);
  }
};
```

#### Password Strength Algorithm:
```typescript
const checkPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;        // Length check
  if (/[A-Z]/.test(password)) strength++;      // Uppercase letter
  if (/[a-z]/.test(password)) strength++;      // Lowercase letter
  if (/[0-9]/.test(password)) strength++;      // Number
  if (/[^A-Za-z0-9]/.test(password)) strength++; // Special character
  return strength;
};
```

### 2. User Login

**File**: `src/app/login/page.tsx`

#### Process Flow:
1. **Email/Password Input**: Standard form inputs with validation
2. **Demo Account Option**: Quick access to demo credentials
3. **Authentication**: Supabase password verification
4. **Session Creation**: Automatic session cookie management
5. **Redirect**: Route to dashboard on success

#### Code Implementation:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setMessage(error.message);
    } else {
      router.push('/'); // Redirect to dashboard
    }
  } catch (error) {
    setMessage('An error occurred during login');
  } finally {
    setIsLoading(false);
  }
};
```

#### Demo Account Feature:
```typescript
const handleDemoLogin = async () => {
  setEmail('demo@trading.co');
  setPassword('demo123');
  
  // Proceed with normal login flow using demo credentials
  const { error } = await supabase.auth.signInWithPassword({
    email: 'demo@trading.co',
    password: 'demo123',
  });
};
```

### 3. Password Reset

**File**: `src/app/forgot-password/page.tsx`

#### Process Flow:
1. **Email Input**: User provides registered email address
2. **Reset Request**: Supabase sends password reset email
3. **Secure Link**: Email contains time-limited reset link
4. **New Password**: User creates new password via secure form
5. **Account Recovery**: User can login with new credentials

#### Code Implementation:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      setMessage(error.message);
      setIsSuccess(false);
    } else {
      setMessage('Password reset instructions have been sent to your email address.');
      setIsSuccess(true);
    }
  } catch (error) {
    setMessage('An error occurred while sending the reset email');
    setIsSuccess(false);
  } finally {
    setIsLoading(false);
  }
};
```

## 🛡️ Session Management

### Middleware Configuration

**Global Middleware** (`src/middleware.ts`):
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**Session Update Logic** (`src/utils/supabase/middleware.ts`):
```typescript
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refreshes the session cookie
  await supabase.auth.getUser()
  return response
}
```

### How Session Management Works:
1. **Automatic Refresh**: Middleware runs on every request to refresh session tokens
2. **Cookie Handling**: Secure HTTP-only cookies store authentication state
3. **SSR Compatibility**: Server and client maintain session synchronization
4. **Security**: Tokens are automatically rotated and validated

## 📊 Database Schema & Operations

### Database Tables

#### 1. User Authentication (`auth.users`)
```sql
-- Managed by Supabase Auth
CREATE TABLE auth.users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  encrypted_password VARCHAR,
  email_confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_metadata JSONB -- Contains full_name and other custom data
);
```

#### 2. User Investments (`public.investments`)
```sql
CREATE TABLE public.investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stock_name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  buy_price DECIMAL(10,2) NOT NULL,
  buy_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. User Transactions (`public.transactions`)
```sql
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
```

#### 4. Portfolio Summary (`public.portfolio`)
```sql
CREATE TABLE public.portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_value DECIMAL(12,2) DEFAULT 0,
  gain_loss DECIMAL(12,2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row-Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
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

### Database Operations Examples

#### Fetching User Data:
```typescript
// Client-side data fetching
const fetchUserInvestments = async () => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching investments:', error);
    return [];
  }
  
  return data;
};
```

#### Server-side Data Fetching:
```typescript
// In a Server Component or API route
const supabase = createClient(); // Server client
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  redirect('/login');
}

const { data: transactions } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', user.id)
  .order('timestamp', { ascending: false });
```

## 🔒 Security Features

### 1. Authentication Security
- **Secure Password Hashing**: Supabase uses bcrypt with salt rounds
- **Email Verification**: Prevents fake account creation
- **Session Token Rotation**: Automatic token refresh for security
- **HTTP-Only Cookies**: Prevents XSS attacks

### 2. Database Security
- **Row-Level Security**: Users can only access their own data
- **Foreign Key Constraints**: Data integrity enforcement
- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Parameterized queries via Supabase client

### 3. Application Security
- **CSRF Protection**: Built into Next.js and Supabase
- **Environment Variable Protection**: Sensitive data not exposed to client
- **Secure Headers**: Middleware adds security headers
- **Rate Limiting**: Supabase provides built-in rate limiting

## 🚨 Error Handling

### Common Error Patterns:

```typescript
// Signup errors
if (error?.message === 'User already registered') {
  setMessage('An account with this email already exists. Try logging in instead.');
}

// Login errors  
if (error?.message === 'Invalid login credentials') {
  setMessage('Incorrect email or password. Please check your credentials and try again.');
}

// Network errors
if (error?.message?.includes('network')) {
  setMessage('Network error. Please check your connection and try again.');
}
```

### Error State Management:
```typescript
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

// Clear errors when user starts typing
const handleInputChange = (value: string) => {
  setEmail(value);
  if (error) setError(''); // Clear previous errors
};
```

## 🧪 Testing Authentication

### Demo Account
- **Email**: demo@trading.co
- **Password**: demo123
- **Virtual Funds**: ₹10,00,000

### Manual Testing Checklist:
- [ ] User can sign up with valid email
- [ ] Email confirmation is sent
- [ ] User can login with correct credentials
- [ ] Invalid credentials are rejected
- [ ] Password reset email is sent
- [ ] Session persists across page reloads
- [ ] User is redirected after login
- [ ] RLS policies prevent data access between users

## 📈 Performance Considerations

### Optimization Strategies:
1. **Connection Pooling**: Supabase handles connection management
2. **Query Optimization**: Use selective queries with specific columns
3. **Caching**: Next.js automatically caches static content
4. **Lazy Loading**: Load user data only when needed
5. **Batch Operations**: Combine multiple database operations where possible

### Example Optimized Query:
```typescript
// Instead of: .select('*')
const { data } = await supabase
  .from('investments')
  .select('stock_name, quantity, buy_price, created_at')
  .limit(10);
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Invalid JWT" Errors
```bash
# Solution: Clear browser cookies and localStorage
localStorage.clear();
# Or programmatically:
await supabase.auth.signOut();
```

#### 2. RLS Policy Denials
```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'investments';

-- Verify user authentication
SELECT auth.uid(); -- Should return user UUID
```

#### 3. Environment Variable Issues
```typescript
// Check if variables are loaded
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
// Should not be undefined
```

#### 4. Middleware Not Running
```typescript
// Verify middleware config matches your routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
```

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Middleware Guide](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase SSR Documentation](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install @supabase/supabase-js @supabase/ssr

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev

# Test authentication
# Navigate to /signup, /login, or /forgot-password
```

This authentication system provides a solid foundation for secure user management in the TradeMaster platform, with modern patterns, robust security, and excellent developer experience.

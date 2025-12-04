# AI Companion Admin Panel

A modern, secure admin panel for managing the AI Companion platform, built with React and Tailwind CSS.

## Features

### Admin Authentication & Access

1. **Admin Login** 
   - Hardcoded credentials: `applore@gmail.com` / `applore123`
   - Email/Password authentication
   - Secure login with form validation
   - Password visibility toggle
   - Loading states and error handling

2. **Forgot Password**
   - Password reset via email
   - Clear success/error messaging
   - Email validation
   - Security information display

3. **Account Settings**
   - Change password functionality
   - Password strength indicator
   - Current password verification
   - Strong password requirements

### User Management

4. **User Directory**
   - View comprehensive list of all registered users
   - Display basic details: name, mobile, registration date
   - Search functionality (name, email, mobile)
   - Advanced filters: gender, age range, location, status
   - Real-time filter and search
   - Quick stats overview

5. **User Profiles**
   - View detailed user profile information
   - Personal information and contact details
   - Conversation notes overview
   - Wallet balance display
   - Activity statistics
   - Suspend/Activate user accounts
   - Beautiful profile UI with gradient headers

### Wallet & Payment Management

6. **User Wallet Management**
   - View wallet balances for all users
   - Search and filter wallet holders
   - Manually credit funds to user wallets
   - Manually debit funds from user wallets
   - Add notes for reconciliation or compensation
   - Preview balance changes before confirmation
   - Platform-wide wallet statistics

7. **Transaction History**
   - Comprehensive list of all transactions
   - Filter by type (recharge, purchase, refund)
   - Filter by status (completed, pending, failed)
   - Filter by date range
   - Filter by amount range
   - Filter by user
   - Export transactions to CSV
   - Transaction statistics and summaries

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server
- **React Hook Form** - Form validation (optional)
- **Axios** - HTTP client for API calls

## Typography

- **Headings**: Poppins (font-weight: 600)
- **Body Text**: Montserrat

## Component Library

The admin panel uses **shadcn/ui** for consistent, accessible, and beautiful UI components:
- Button - Multiple variants (default, outline, ghost, destructive)
- Card - Structured content containers
- Input - Form inputs with validation states
- Label - Accessible form labels
- Badge - Status indicators and tags
- Tabs - Tab navigation components

All components are built with:
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **Class Variance Authority** for variant management
- Full TypeScript support (converted to JavaScript)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Login Credentials

```
Email: applore@gmail.com
Password: applore123
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AuthLayout.jsx          # Layout for auth pages
│   ├── DashboardLayout.jsx     # Layout with navigation
│   └── ProtectedRoute.jsx      # Route protection component
├── pages/
│   ├── AdminLogin.jsx          # Login page
│   ├── ForgotPassword.jsx      # Password reset page
│   ├── ChangePassword.jsx      # Change password page
│   ├── Dashboard.jsx           # Main dashboard with stats
│   ├── Users.jsx               # User directory & management
│   ├── UserProfile.jsx         # Individual user details
│   ├── Wallets.jsx             # Wallet management
│   └── Transactions.jsx        # Transaction history
├── data/
│   └── mockData.js             # Mock users and transactions
├── App.jsx                     # Main app with all routes
├── main.jsx                    # App entry point
└── index.css                   # Global styles with Tailwind
```

## Features Overview

### Consistent Input Styling
All input fields use the `.input-field` class for uniform appearance across the app.

### Security Features
- Protected routes requiring authentication
- Password strength validation
- Secure password reset flow
- Token-based authentication (localStorage for demo)

### User Experience
- Loading states for async operations
- Clear error messages with validation
- Success notifications
- Responsive design for all screen sizes
- Smooth transitions and animations

## Features Breakdown

### Dashboard
- Real-time statistics overview
- Quick access cards to all sections
- Recent transactions display
- Clickable stat cards for navigation
- Beautiful gradient welcome banner

### User Management
- Comprehensive user table with sorting
- Multi-criteria search and filtering
- User profile with detailed information
- One-click suspend/activate accounts
- Modal confirmations for critical actions
- Activity and conversation tracking

### Wallet Management  
- Platform-wide balance overview
- Individual wallet balance viewing
- Manual balance adjustment (credit/debit)
- Mandatory notes for all adjustments
- Balance preview before confirmation
- Search and filter capabilities

### Transaction History
- Complete transaction log
- Advanced filtering system
- CSV export functionality
- Transaction type categorization
- Status tracking (completed/pending/failed)
- Amount range filtering
- Date range filtering

## API Integration

The app currently uses mock data. To integrate with a real backend API, update:

1. **Login**: `src/pages/AdminLogin.jsx` - Replace hardcoded credentials with API call
2. **Forgot Password**: `src/pages/ForgotPassword.jsx` - Add password reset API
3. **Change Password**: `src/pages/ChangePassword.jsx` - Add change password API
4. **Users**: `src/pages/Users.jsx` & `UserProfile.jsx` - Replace mockUsers with API calls
5. **Wallets**: `src/pages/Wallets.jsx` - Add wallet adjustment API
6. **Transactions**: `src/pages/Transactions.jsx` - Replace mockTransactions with API calls

## Customization

### Colors
The app uses a blue/purple color scheme. Modify in `tailwind.config.js` or individual components.

### Authentication Storage
Currently uses `localStorage` for demo purposes. Replace with secure token storage (httpOnly cookies recommended) in production.

## License

Private - All rights reserved


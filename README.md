# Shortest - URL Shortener

A modern, privacy-friendly URL shortener with real-time analytics built with React, Firebase, and Vite.

## 🚀 Features

- **Instant URL Shortening** - Create short links in milliseconds
- **Custom Aliases** - Choose your own custom short codes
- **Real-time Analytics** - Track clicks, referrers, and device types
- **User Authentication** - Sign up to manage all your links
- **Guest Mode** - Create links without an account
- **Responsive Design** - Works perfectly on all devices
- **Privacy First** - Your data is secure and never shared

## 📁 Project Structure

```
shortest/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components (Button, Input, Card, etc.)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── shortener/      # URL shortener specific components
│   │   ├── dashboard/      # Dashboard specific components
│   │   └── analytics/      # Analytics visualization components
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── StatsPage.jsx
│   │   └── RedirectHandler.jsx
│   ├── services/           # Firebase service layer
│   │   ├── authService.js
│   │   ├── urlService.js
│   │   └── analyticsService.js
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useShortener.js
│   │   └── useAnalytics.js
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   ├── config/             # Configuration files
│   │   ├── firebase.js
│   │   └── constants.js
│   ├── utils/              # Utility functions
│   │   └── helpers.js
│   ├── types/              # Type definitions (JSDoc)
│   │   └── index.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (not committed)
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Copy your Firebase configuration
5. Update the `.env` file with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Set Up Firestore Rules

In your Firebase Console, add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /links/{linkId} {
      allow read: if true;
      allow create: if true;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    match /clicks/{clickId} {
      allow read: if true;
      allow create: if true;
    }

    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

  }
}

```

### 4. Set Up Firestore Indexes

The app requires a composite index for analytics queries. You have two options:

**Option A: Automatic Setup (Recommended)**

Deploy the indexes using Firebase CLI:

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select Firestore)
firebase init firestore

# Deploy the indexes
firebase deploy --only firestore:indexes
```

**Option B: Manual Setup**

If you see an index error in the console, click the provided link to create the index automatically, or manually create it in the Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Indexes**
4. Click **Create Index**
5. Set:
   - Collection ID: `clicks`
   - Field 1: `shortCode` (Ascending)
   - Field 2: `timestamp` (Descending)
6. Click **Create**

> **Note:** The app includes fallback logic, so it will work even without the index, but performance will be better with it.

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

## 🏗️ Architecture

### Component Organization

- **`components/common/`** - Reusable UI components used throughout the app
- **`components/layout/`** - Layout components like Header and Footer
- **`components/shortener/`** - Components specific to URL shortening
- **`components/dashboard/`** - Components for the user dashboard
- **`components/analytics/`** - Components for displaying analytics

### Service Layer

All Firebase operations are abstracted into service modules:

- **`authService.js`** - Authentication operations (signup, signin, signout)
- **`urlService.js`** - URL shortening and retrieval operations
- **`analyticsService.js`** - Analytics data processing

### Custom Hooks

- **`useAuth`** - Access authentication state
- **`useShortener`** - URL shortening logic and state
- **`useAnalytics`** - Fetch and manage analytics data

### State Management

- **AuthContext** - Global authentication state using React Context

## 🔒 Security

- Firebase credentials are stored in `.env` file (not committed to Git)
- `.env` is listed in `.gitignore` to prevent accidental commits
- Use `.env.example` as a template for setting up your own environment

## 📝 Making Changes

### To modify the UI:
- Edit components in `src/components/`
- Update styles in `src/index.css`

### To add new features:
1. Create new components in appropriate folders
2. Add service functions in `src/services/`
3. Create custom hooks if needed in `src/hooks/`
4. Update routes in `src/App.jsx`

### To change Firebase configuration:
- Update values in `.env` file
- Never commit `.env` to version control

## 🎨 Styling

This project uses:
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS Variables** - For brand colors
- **Google Fonts** - Inter font family

## 📦 Dependencies

- **React** - UI library
- **React Router** - Routing
- **Firebase** - Backend services (Auth, Firestore)
- **Recharts** - Analytics charts
- **Vite** - Build tool

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or production!

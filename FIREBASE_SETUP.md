# Firebase Initialization Guide

This guide will help you set up Firebase for the Shortest URL Shortener project.

## Prerequisites

- Node.js installed
- A Firebase account
- Firebase CLI installed (`npm install -g firebase-tools`)

## Step-by-Step Setup

### 1. Login to Firebase

```bash
firebase login
```

### 2. Initialize Firebase in this project

```bash
firebase init
```

When prompted:
- Select **Firestore** (use spacebar to select, enter to confirm)
- Use an existing project or create a new one
- Accept default file names:
  - `firestore.rules` (already exists)
  - `firestore.indexes.json` (already exists)

### 3. Deploy Firestore Rules and Indexes

```bash
# Deploy both rules and indexes
firebase deploy --only firestore

# Or deploy separately:
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Troubleshooting

### "Index required" error

If you see an error like:
```
The query requires an index. You can create it here: https://console.firebase.google.com/...
```

**Solution 1:** Click the link in the error message to create the index automatically.

**Solution 2:** Run `firebase deploy --only firestore:indexes`

**Solution 3:** The app will still work! It has fallback logic that sorts data in memory instead.

### Permission denied errors

Make sure your Firestore rules are deployed:
```bash
firebase deploy --only firestore:rules
```

## Verifying Setup

After deployment, you can verify:

1. **Rules**: Check in Firebase Console → Firestore Database → Rules
2. **Indexes**: Check in Firebase Console → Firestore Database → Indexes

You should see:
- A composite index on `clicks` collection with fields: `shortCode` (Ascending), `timestamp` (Descending)

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Indexes Guide](https://firebase.google.com/docs/firestore/query-data/indexing)

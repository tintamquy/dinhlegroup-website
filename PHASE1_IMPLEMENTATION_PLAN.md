# Phase 1: Foundation & Authentication - Implementation Plan

## Overview
Build the foundation for Companion Journey PWA with project setup, multi-language support, Firebase integration, Gemini AI service, and authentication system.

---

## Step 1: Project Setup & Dependencies

### 1.1 Initialize React + Vite + TypeScript Project
- Run `npm create vite@latest companion-journey -- --template react-ts`
- Navigate to project directory
- Install core dependencies:
  ```bash
  npm install firebase @google/generative-ai zustand react-router-dom
  npm install -D tailwindcss postcss autoprefixer
  npm install react-i18next i18next-http-backend i18next-browser-languagedetector
  npm install framer-motion canvas-confetti workbox-window
  ```

### 1.2 Tailwind CSS Configuration
- Initialize Tailwind: `npx tailwindcss init -p`
- Configure `tailwind.config.js` with mobile-first approach
- Add Tailwind directives to CSS entry point
- Setup custom color palette for emotions and gamification

### 1.3 Folder Structure Creation
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Buttons, Inputs, Cards, etc.
│   └── auth/           # Auth-specific components
├── pages/              # Route pages
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── Dashboard.tsx (placeholder)
├── services/           # External service integrations
│   ├── firebase.ts
│   ├── geminiService.ts
│   └── i18nService.ts
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   └── useLanguage.ts
├── types/              # TypeScript type definitions
│   ├── User.types.ts
│   ├── Checkin.types.ts
│   └── Badge.types.ts
├── config/            # Configuration files
│   └── constants.ts
├── i18n/              # i18n configuration
│   └── index.ts
├── store/             # Zustand stores
│   ├── authStore.ts
│   └── languageStore.ts
└── App.tsx
```

### 1.4 Environment Variables Setup
- Create `.env` file with template:
  ```
  VITE_FIREBASE_API_KEY=
  VITE_FIREBASE_AUTH_DOMAIN=
  VITE_FIREBASE_PROJECT_ID=
  VITE_FIREBASE_STORAGE_BUCKET=
  VITE_FIREBASE_MESSAGING_SENDER_ID=
  VITE_FIREBASE_APP_ID=
  VITE_GEMINI_API_KEY=
  ```
- Add `.env` to `.gitignore`
- Create `.env.example` for reference

---

## Step 2: Multi-Language System (i18n)

### 2.1 i18n Configuration
- Create `src/i18n/index.ts` with:
  - i18next initialization
  - Language detector (browser + localStorage)
  - HTTP backend for loading translations
  - Supported languages: en, vi, es, pt, ar
  - Fallback to English

### 2.2 Translation Files Structure
Create `/public/locales/{lang}/translation.json` for each language:

**Translation Keys Required:**
```json
{
  "auth": {
    "login": "Login",
    "signup": "Sign Up",
    "email": "Email",
    "password": "Password",
    "googleSignIn": "Sign in with Google",
    "alreadyHaveAccount": "Already have an account?",
    "dontHaveAccount": "Don't have an account?",
    "forgotPassword": "Forgot password?",
    "errors": {
      "invalidEmail": "Invalid email address",
      "weakPassword": "Password should be at least 6 characters",
      "userNotFound": "User not found",
      "wrongPassword": "Wrong password",
      "emailInUse": "Email already in use"
    }
  },
  "emotions": {
    "happy": "Happy",
    "sad": "Sad",
    "angry": "Angry",
    "anxious": "Anxious",
    "lonely": "Lonely",
    "grateful": "Grateful",
    "hopeful": "Hopeful",
    "struggling": "Struggling",
    "intensity": "Intensity",
    "trigger": "What triggered this feeling?",
    "optional": "Optional"
  },
  "dashboard": {
    "welcome": "Welcome",
    "streak": "Day Streak",
    "level": "Level",
    "checkIn": "Daily Check-in",
    "badges": "Badges",
    "community": "Community",
    "quickStats": "Quick Stats",
    "totalCheckins": "Total Check-ins",
    "badgesEarned": "Badges Earned",
    "daysInRecovery": "Days in Recovery"
  },
  "aiCoach": {
    "thinking": "Thinking...",
    "encouraging": "You're doing great!",
    "crisis": "I'm here for you"
  },
  "badges": {
    "firstStep": {
      "name": "First Step",
      "description": "Completed your first check-in"
    }
    // ... 50+ more badges
  },
  "gamification": {
    "xp": "XP",
    "levelUp": "Level Up!",
    "achievementUnlocked": "Achievement Unlocked!",
    "streakMultiplier": "Streak Multiplier"
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit",
    "continue": "Continue"
  }
}
```

### 2.3 Language Store (Zustand)
- Create `src/store/languageStore.ts`:
  - Current language state
  - Set language function
  - Persist to localStorage
  - Auto-sync with i18next

### 2.4 Language Selector Component
- Create `src/components/common/LanguageSelector.tsx`:
  - Dropdown with flag icons
  - Language names in native script
  - Updates store and i18next on change

---

## Step 3: Firebase Setup

### 3.1 Firebase Configuration
- Create `src/services/firebase.ts`:
  - Initialize Firebase app with config from env vars
  - Export Firebase Auth instance
  - Export Firestore instance
  - Export Firebase Auth providers (Google)

### 3.2 Firestore Security Rules
Create `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Check-ins subcollection
      match /checkins/{checkinId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Badges subcollection
      match /badges/{badgeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Groups - members can read/write
    match /groups/{groupId} {
      allow read: if request.auth != null && request.auth.uid in resource.data.members;
      allow write: if request.auth != null && request.auth.uid in resource.data.members;
    }
  }
}
```

### 3.3 TypeScript Types for Firestore
Create `src/types/User.types.ts`:
```typescript
export interface User {
  uid: string;
  displayName: string;
  email: string;
  createdAt: Timestamp;
  currentStreak: number;
  longestStreak: number;
  level: number;
  xp: number;
  language: string;
  badges: string[];
}
```

Create `src/types/Checkin.types.ts`:
```typescript
export interface Checkin {
  emotion: string;
  intensity: number; // 1-10
  trigger?: string;
  aiResponse: string;
  timestamp: Timestamp;
  xpEarned: number;
}
```

### 3.4 Firestore Service Functions
Create helper functions in `src/services/firebase.ts`:
- `createUserProfile(uid, userData)`
- `getUserProfile(uid)`
- `updateUserProfile(uid, updates)`
- `createCheckin(uid, checkinData)`
- `getUserCheckins(uid, limit)`
- `checkCheckinExists(uid, date)`

---

## Step 4: Gemini AI Service

### 4.1 Gemini Service Setup
Create `src/services/geminiService.ts`:
- Initialize Gemini client with API key from env
- Use `gemini-2.0-flash-exp` model
- Rate limiting: 15 requests per minute
- Exponential backoff on rate limit errors

### 4.2 Prompt Template Function
Create `getCoachPrompt(emotion, intensity, trigger, language)`:
- Multi-language support (detect language, respond in same)
- Empathetic acknowledgment
- Praise for checking in
- 1-2 micro-actions (< 5 min)
- Natural emoji usage (1-2)
- 2-3 sentence response
- Example structure:
  ```
  "You're feeling [emotion] at intensity [intensity]. 
  I'm proud of you for checking in - that takes courage! 
  [Micro-action 1] or [Micro-action 2] might help right now. 
  You've got this! 💪"
  ```

### 4.3 Response Caching
- Check Firestore cache before API call
- Cache key: `emotion_intensity_trigger_hash`
- Cache TTL: 24 hours
- Store in `/users/{uid}/aiCache/{cacheKey}`

### 4.4 Error Handling
- Handle rate limits gracefully
- Retry with exponential backoff
- Fallback to pre-written responses if API fails
- Log errors for debugging

---

## Step 5: Authentication Pages

### 5.1 Auth Store (Zustand)
Create `src/store/authStore.ts`:
- Current user state
- Loading state
- Error state
- Login function (email/password)
- Signup function (email/password)
- Google Sign-in function
- Logout function
- Persist auth state

### 5.2 useAuth Hook
Create `src/hooks/useAuth.ts`:
- Wrapper around auth store
- Auto-sync with Firebase Auth state
- Redirect logic
- Loading states

### 5.3 Login Page (`src/pages/Login.tsx`)
**Design:**
- Beautiful gradient background (purple to blue)
- Glassmorphism card for form
- Email input with validation
- Password input with show/hide toggle
- "Sign in with Google" button
- Link to signup page
- Error messages with i18n
- Loading spinner during auth
- Mobile-first responsive

**Functionality:**
- Form validation (email format, password length)
- Firebase email/password login
- Google Sign-in
- Error handling with translated messages
- Redirect to `/dashboard` on success
- Remember session (Firebase handles this)

### 5.4 Signup Page (`src/pages/Signup.tsx`)
**Design:**
- Similar to Login page
- Additional "Display Name" field
- Password confirmation field
- Terms of service checkbox
- Link to login page

**Functionality:**
- Form validation
- Firebase email/password signup
- Create user profile in Firestore on signup
- Initialize user stats (streak: 0, level: 1, xp: 0, badges: [])
- Google Sign-in (extract display name from Google account)
- Error handling
- Redirect to `/dashboard` on success

### 5.5 Protected Route Component
Create `src/components/auth/ProtectedRoute.tsx`:
- Check if user is authenticated
- Redirect to `/login` if not
- Show loading state while checking
- Render children if authenticated

### 5.6 Router Setup (`src/App.tsx`)
- Setup React Router
- Routes:
  - `/` → redirect to `/dashboard` (if auth) or `/login`
  - `/login` → Login page
  - `/signup` → Signup page
  - `/dashboard` → Protected Dashboard page (placeholder for now)

---

## Step 6: Testing & Validation

### 6.1 Manual Testing Checklist
- [ ] Project builds without errors
- [ ] Tailwind CSS styles apply correctly
- [ ] All 5 languages load and display correctly
- [ ] Language preference saves to localStorage
- [ ] Firebase initializes correctly
- [ ] Email/password signup works
- [ ] Email/password login works
- [ ] Google Sign-in works
- [ ] User profile created in Firestore on signup
- [ ] Protected routes redirect to login when not authenticated
- [ ] Login redirects to dashboard when authenticated
- [ ] Gemini API responds (test with simple prompt)
- [ ] Rate limiting works (test with multiple rapid calls)
- [ ] Mobile responsive (test at 375px width)
- [ ] No console errors

### 6.2 Code Quality Checks
- [ ] TypeScript strict mode enabled
- [ ] All components have proper TypeScript types
- [ ] No `any` types used
- [ ] Error handling in all async functions
- [ ] Loading states for all async operations
- [ ] ESLint passes
- [ ] Prettier formatting applied

---

## File Creation Order

1. **Project Setup**
   - Initialize Vite project
   - Install dependencies
   - Setup Tailwind

2. **Configuration Files**
   - `.env.example`
   - `tailwind.config.js`
   - `tsconfig.json` (update if needed)

3. **i18n System**
   - `src/i18n/index.ts`
   - `public/locales/en/translation.json` (complete)
   - `public/locales/vi/translation.json` (complete)
   - `public/locales/es/translation.json` (complete)
   - `public/locales/pt/translation.json` (complete)
   - `public/locales/ar/translation.json` (complete)
   - `src/store/languageStore.ts`
   - `src/components/common/LanguageSelector.tsx`

4. **Firebase**
   - `src/services/firebase.ts`
   - `firestore.rules`
   - `src/types/User.types.ts`
   - `src/types/Checkin.types.ts`

5. **Gemini AI**
   - `src/services/geminiService.ts`

6. **Authentication**
   - `src/store/authStore.ts`
   - `src/hooks/useAuth.ts`
   - `src/components/auth/ProtectedRoute.tsx`
   - `src/pages/Login.tsx`
   - `src/pages/Signup.tsx`
   - `src/App.tsx` (router setup)

7. **Common Components**
   - `src/components/common/Button.tsx`
   - `src/components/common/Input.tsx`
   - `src/components/common/LoadingSpinner.tsx`

---

## Estimated Time
- Project Setup: 30 min
- i18n System: 2 hours
- Firebase Setup: 1.5 hours
- Gemini AI: 1 hour
- Authentication Pages: 2 hours
- Testing & Polish: 1 hour

**Total: ~8 hours**

---

## Next Steps After Phase 1
Once Phase 1 is complete and tested, we'll proceed to Phase 2:
- Emotion Check-in System
- Gamification Engine
- Badge System
- Dashboard Page

---

## Notes
- All user-facing text must be translated
- Use semantic HTML for accessibility
- Mobile-first design approach
- Beautiful, modern UI with gradients and glassmorphism
- Proper error handling and loading states
- TypeScript strict mode throughout


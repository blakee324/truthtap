# TruthTap PWA — Deployment Guide

## What you need (all free)

1. **GitHub account** — github.com (free)
2. **Vercel account** — vercel.com (free, use "Sign up with GitHub")
3. **Upstash account** — upstash.com (free, for storing notification subscriptions)

## Step-by-step deployment

### Step 1: Install Git

Download from https://git-scm.com/download/win and run the installer.
Accept all defaults.

### Step 2: Open Command Prompt and navigate to the project

```
cd %USERPROFILE%\Desktop\truthtap-pwa
```

(adjust path to wherever you unzipped it)

### Step 3: Install dependencies

```
npm install
```

### Step 4: Generate your VAPID keys

```
npm run generate-vapid
```

This prints three lines. Copy them — you'll need them in Step 7.

### Step 5: Create an Upstash Redis database

1. Go to https://upstash.com and sign up (free)
2. Click "Create Database"
3. Name it "truthtap", pick the closest region
4. Click Create
5. On the database page, copy the **UPSTASH_REDIS_REST_URL** and **UPSTASH_REDIS_REST_TOKEN**

### Step 6: Push code to GitHub

```
git init
git add .
git commit -m "TruthTap initial commit"
```

Now go to https://github.com/new in your browser:
- Repository name: truthtap
- Set to Private
- Click "Create repository"

Back in Command Prompt, replace YOUR_USERNAME with your GitHub username:

```
git remote add origin https://github.com/YOUR_USERNAME/truthtap.git
git branch -M main
git push -u origin main
```

It will ask for your GitHub username and password (use a personal access token as password — create one at github.com/settings/tokens).

### Step 7: Deploy to Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Click "Import Project" → select your "truthtap" repo
3. Before clicking Deploy, click "Environment Variables"
4. Add these 6 variables (using the values from Steps 4 and 5):

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY = (from Step 4)
VAPID_PRIVATE_KEY = (from Step 4)
VAPID_EMAIL = your-email@example.com
UPSTASH_REDIS_REST_URL = (from Step 5)
UPSTASH_REDIS_REST_TOKEN = (from Step 5)
CRON_SECRET = make-up-any-random-string-here
```

5. Click Deploy
6. Wait 1-2 minutes — Vercel builds and hosts your app

Your app is now live at `https://truthtap-xxx.vercel.app` (Vercel gives you a URL).

### Step 8: Install on your iPhone

1. Open Safari on your iPhone
2. Go to your Vercel URL
3. Tap the Share button (square with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Tap "Add"
6. Open TruthTap from your home screen
7. Tap "HIT ME" on the splash screen
8. Allow notifications when prompted

You'll now get one notification per day at 10am (configurable in vercel.json).

### Changing notification time

Edit `vercel.json` and change the cron schedule:

```json
"schedule": "0 10 * * *"
```

This is UTC time. Examples:
- `"0 10 * * *"` = 10am UTC (8pm AEST)
- `"0 22 * * *"` = 10pm UTC (8am AEST)  
- `"0 7 * * *"` = 7am UTC (5pm AEST)

After changing, push to GitHub and Vercel auto-redeploys:

```
git add .
git commit -m "update cron time"
git push
```

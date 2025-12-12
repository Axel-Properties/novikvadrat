# Vercel Deployment Guide for Novi Kvadrat

This guide will help you deploy your Next.js application to Vercel and fix common 404 errors.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Vercel Configuration](#vercel-configuration)
4. [Environment Variables](#environment-variables)
5. [Deployment Steps](#deployment-steps)
6. [Troubleshooting 404 Errors](#troubleshooting-404-errors)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Your project pushed to GitHub, GitLab, or Bitbucket
- Supabase project credentials (if using Supabase)

---

## Project Structure

Your project is located in the `novi-kvadrat-web/` subdirectory. This is important for Vercel configuration.

```
novikvadrat/
├── novi-kvadrat-web/     ← Your Next.js app is here
│   ├── src/
│   ├── package.json
│   └── next.config.ts
└── ...
```

---

## Vercel Configuration

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"

2. **Import Your Repository**
   - Connect your Git provider (GitHub/GitLab/Bitbucket)
   - Select the `novikvadrat` repository

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `novi-kvadrat-web` ⚠️ **CRITICAL: Set this!**
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (default, leave as is)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (see next section)

5. **Deploy**

### Option 2: Using vercel.json (Alternative)

A `vercel.json` file has been created in `novi-kvadrat-web/` directory. This file works **in combination with** setting the Root Directory in Vercel dashboard.

**Important**: You still need to set **Root Directory** to `novi-kvadrat-web` in Vercel dashboard settings. The `vercel.json` file provides additional configuration like security headers and API route handling.

The `vercel.json` file includes:
- Build and install commands
- Framework detection
- Security headers
- API route rewrites

**Note**: If you prefer not to set Root Directory in the dashboard, you would need a different `vercel.json` in the repository root with path rewrites, but this is more complex and not recommended. The current setup (Root Directory + vercel.json in subdirectory) is the cleanest approach.

---

## Environment Variables

Your app uses Supabase, so you need to configure environment variables in Vercel.

### Required Environment Variables

1. **Go to Project Settings → Environment Variables**

2. **Add the following variables:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **How to find your Supabase credentials:**
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

4. **Set for all environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Optional Environment Variables

If you have any other environment variables in your `.env.local`, add them to Vercel as well.

---

## Deployment Steps

### Step 1: Prepare Your Repository

```bash
# Make sure your code is committed and pushed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy via Vercel Dashboard

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository

2. **Configure Settings**
   - **Root Directory**: `novi-kvadrat-web` ⚠️ **This is the most important setting!**
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Add Environment Variables**
   - Add all Supabase credentials (see above)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Step 3: Verify Deployment

After deployment, Vercel will provide you with a URL like:
- `https://your-project.vercel.app`

**Important**: Your app uses locale-based routing, so:
- ✅ `https://your-project.vercel.app` → Should redirect to `/sr` (default locale)
- ✅ `https://your-project.vercel.app/sr` → Serbian (Latin)
- ✅ `https://your-project.vercel.app/en` → English
- ✅ `https://your-project.vercel.app/sr-cyrl` → Serbian (Cyrillic)

---

## Troubleshooting 404 Errors

### Issue 1: Root Directory Not Set

**Symptom**: 404 error on all routes, build succeeds but site shows 404.

**Solution**:
1. Go to Project Settings → General
2. Set **Root Directory** to `novi-kvadrat-web`
3. Redeploy

### Issue 2: Missing Locale in URL

**Symptom**: 404 when accessing root URL, but `/sr` or `/en` works.

**Solution**: This is expected behavior! Your middleware redirects root to default locale. If you want to change this:
- Modify `src/middleware.ts` default locale
- Or access URLs with locale prefix: `/sr`, `/en`, etc.

### Issue 3: Build Fails

**Symptom**: Build fails with errors.

**Common fixes**:
1. **TypeScript errors**: Fix all TypeScript errors locally first
   ```bash
   cd novi-kvadrat-web
   npm run build
   ```

2. **Missing dependencies**: Ensure all dependencies are in `package.json`
   ```bash
   cd novi-kvadrat-web
   npm install
   ```

3. **Environment variables**: Make sure all required env vars are set in Vercel

### Issue 4: API Routes Return 404

**Symptom**: `/api/projects` returns 404.

**Solution**: 
- API routes should work at: `https://your-project.vercel.app/api/projects`
- Check that routes are in `src/app/api/` directory
- Verify middleware isn't blocking API routes (it shouldn't based on your config)

### Issue 5: Static Files Not Loading

**Symptom**: Images, fonts, or other static files return 404.

**Solution**:
- Ensure files are in `novi-kvadrat-web/public/` directory
- Check `next.config.ts` for image domain configurations
- Verify file paths in your code match the public directory structure

### Issue 6: Supabase Connection Errors

**Symptom**: Database queries fail, authentication doesn't work.

**Solution**:
1. Verify environment variables are set correctly in Vercel
2. Check Supabase project is active and not paused
3. Verify API keys are correct
4. Check Supabase project settings for allowed domains (add your Vercel domain)

---

## Post-Deployment Checklist

- [ ] Root directory is set to `novi-kvadrat-web`
- [ ] All environment variables are configured
- [ ] Build completes successfully
- [ ] Homepage loads at root URL (redirects to `/sr`)
- [ ] Locale routes work: `/sr`, `/en`, `/sr-cyrl`
- [ ] Project pages load: `/sr/novogradnja/beograd`
- [ ] Individual project pages work: `/sr/projekat/[slug]`
- [ ] API routes respond: `/api/projects`
- [ ] Images and static assets load
- [ ] Supabase connection works
- [ ] Custom domain configured (if applicable)

---

## Advanced Configuration

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Preview Deployments

Every push to a branch creates a preview deployment automatically. This is great for testing before merging to main.

### Production Branch

Set your production branch in Project Settings → Git:
- Usually `main` or `master`
- Only this branch will deploy to production URL

### Build Optimization

Your `next.config.ts` already has image optimization configured. For better performance:
- Enable Vercel Analytics (optional)
- Enable Vercel Speed Insights (optional)
- Configure caching headers if needed

---

## Quick Reference

### Vercel Dashboard Settings

```
Framework Preset: Next.js
Root Directory: novi-kvadrat-web
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 20.x (or latest)
```

### Environment Variables Template

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Useful Commands

```bash
# Test build locally
cd novi-kvadrat-web
npm run build
npm start

# Check for TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint
```

---

## Need Help?

If you're still experiencing 404 errors after following this guide:

1. **Check Vercel Build Logs**
   - Go to your project → Deployments
   - Click on the latest deployment
   - Check "Build Logs" for errors

2. **Check Function Logs**
   - Go to your project → Deployments
   - Click on a deployment
   - Check "Function Logs" for runtime errors

3. **Verify Local Build**
   - Make sure `npm run build` works locally
   - Fix any errors before deploying

4. **Common Issues**
   - Root directory not set → Most common cause of 404
   - Missing environment variables → Check Vercel settings
   - TypeScript errors → Fix locally first
   - Missing dependencies → Check package.json

---

## Summary

The most common cause of 404 errors on Vercel for this project is **not setting the Root Directory to `novi-kvadrat-web`**. Make sure this is configured correctly in your Vercel project settings!

Good luck with your deployment! 🚀

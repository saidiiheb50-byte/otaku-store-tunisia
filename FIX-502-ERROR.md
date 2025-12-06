# Fixing 502 Error on Vercel

## What is a 502 Error?

A **502 Bad Gateway** error means:
- The server (Vercel) received an invalid response from your application
- Usually caused by:
  - Server-side rendering (SSR) errors
  - Runtime crashes during page load
  - Hydration mismatches between server and client
  - Missing dependencies or build issues

## Root Cause

The main issue was **localStorage access during SSR**. In Next.js:
- Components render on the server first (SSR)
- `localStorage` is only available in the browser (client-side)
- Accessing `localStorage` during SSR causes a crash → 502 error

## Fixes Applied

### ✅ 1. Fixed CartContext localStorage Issue

**Before:**
```tsx
useEffect(() => {
  const savedCart = localStorage.getItem('cart') // ❌ Runs during SSR
  // ...
}, [])
```

**After:**
```tsx
const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
  setIsMounted(true) // ✅ Only runs on client
  const savedCart = localStorage.getItem('cart')
  // ...
}, [])

useEffect(() => {
  if (isMounted) { // ✅ Only update localStorage after mount
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}, [cart, isMounted])
```

### ✅ 2. Updated .gitignore

Added `server.js` to `.gitignore` since it's not needed for Next.js deployment on Vercel.

## How to Verify the Fix

1. **Test locally:**
   ```bash
   npm run build
   npm start
   ```
   Visit `http://localhost:3000` - should work without errors

2. **Check build logs on Vercel:**
   - Go to your Vercel dashboard
   - Click on your project
   - Check "Deployments" tab
   - Look for any build errors

3. **Check runtime logs:**
   - In Vercel dashboard → Functions tab
   - Look for any runtime errors

## Common 502 Causes & Solutions

### 1. localStorage / window / document in SSR
**Solution:** Use `useEffect` with `isMounted` check or `typeof window !== 'undefined'`

### 2. Missing Environment Variables
**Solution:** Add them in Vercel Dashboard → Settings → Environment Variables

### 3. Import Errors
**Solution:** Check all imports use correct paths (`@/` alias)

### 4. TypeScript Errors
**Solution:** Fix all TypeScript errors before deploying

### 5. Memory/Timeout Issues
**Solution:** Optimize your code, reduce bundle size

## Testing Checklist

- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in browser
- [ ] Cart functionality works
- [ ] All pages load correctly
- [ ] No hydration warnings in console

## If Still Getting 502

1. **Check Vercel Build Logs:**
   - Look for specific error messages
   - Check which file/line is causing the issue

2. **Enable Debug Mode:**
   Add to `next.config.js`:
   ```js
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     // Add this for debugging
     onDemandEntries: {
       maxInactiveAge: 25 * 1000,
       pagesBufferLength: 2,
     },
   }
   ```

3. **Check Runtime Logs:**
   - Vercel Dashboard → Functions → View logs
   - Look for stack traces

4. **Test with Minimal Code:**
   - Temporarily comment out complex features
   - Deploy minimal version to isolate the issue

## Next Steps

1. Commit and push the fixes:
   ```bash
   git add .
   git commit -m "Fix 502 error: localStorage SSR issue"
   git push
   ```

2. Vercel will auto-deploy
3. Check the new deployment
4. Verify the site works

---

**The fix is now applied!** Redeploy and the 502 error should be resolved.


